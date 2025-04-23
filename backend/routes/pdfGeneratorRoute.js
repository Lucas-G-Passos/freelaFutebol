import express from "express";
import createPDF from "./functions/pdfGen.js";

const router = express.Router();

// Validação profunda genérica
function validateFields(obj, schema) {
  for (const key in schema) {
    const rule = schema[key];
    if (typeof rule === "object") {
      if (!obj[key]) throw new Error(`Campo '${key}' é obrigatório`);
      validateFields(obj[key], rule);
    } else {
      if (!obj[key]) throw new Error(rule);
    }
  }
}

router.post("/pdf", async (req, res) => {
  try {
    // Campos obrigatórios
    const requiredFields = {
      aluno: {
        nome_completo: "Nome do aluno é obrigatório",
        data_nascimento: "Data de nascimento é obrigatória",
        data_matricula: "Data de matrícula é obrigatória",
        id_turma: "ID da turma é obrigatório",
      },
      endereco: {
        estado: "Estado é obrigatório",
        cidade: "Cidade é obrigatória",
        rua: "Rua é obrigatória",
        cep: "CEP é obrigatório",
      },
      responsavel: {
        nome: "Nome do responsável é obrigatório",
        cpf: "CPF do responsável é obrigatório",
        rg: "RG do responsável é obrigatório",
        grau_parentesco: "Grau de parentesco é obrigatório",
      },
    };

    // Valida entrada
    validateFields(req.body, requiredFields);

    // Prepara dados exatamente conforme requisitado no front-end
    const pdfData = {
      aluno: {
        ...req.body.aluno,
      },
      endereco: {
        ...req.body.endereco,
        numero: req.body.endereco.numero || "N/A",
      },
      responsavel: {
        ...req.body.responsavel,
      },
    };

    // Gera PDF
    const raw = await createPDF(pdfData);
    const pdfBuffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);

    // Configura resposta para download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="ficha_${pdfData.aluno.nome_completo.replace(
        /\s/g,
        "_"
      )}.pdf"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    return res.end(pdfBuffer);
  } catch (error) {
    console.error("Erro na geração do PDF:", error);
    return res.status(400).json({
      error: "Falha na geração do PDF",
      details: error.message,
    });
  }
});

export default router;
