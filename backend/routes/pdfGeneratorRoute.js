import express from "express";
import createPDF from "./functions/pdfGen.js";
import db from "./../db.js";

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

async function getTurmaById(id) {
  const [rows] = await db.query("SELECT * FROM turmas WHERE id = ?", [id]);
  return rows[0];
}
async function getPagbyId(id) {
  const [rows] = await db.query(
    "SELECT * FROM pagamentos WHERE responsavel_id = ?",
    [id]
  );
  return rows[0];
}

router.post("/pdf", async (req, res) => {
  try {
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

    validateFields(req.body, requiredFields);

    const turma = await getTurmaById(req.body.aluno.id_turma);
    const pag = await getPagbyId(req.body.responsavel.id);

    const pdfData = {
      aluno: {
        ...req.body.aluno,
        data_matricula: new Date(
          req.body.aluno.data_matricula
        ).toLocaleDateString(),
        data_nascimento: new Date(
          req.body.aluno.data_nascimento
        ).toLocaleDateString(),
      },
      endereco: {
        ...req.body.endereco,
        numero: req.body.endereco.numero || "N/A",
      },
      responsavel: {
        ...req.body.responsavel,
      },
      turma: turma,
      pagamento: {
        ...pag,
        data_vencimento: new Date(pag.data_vencimento).toLocaleDateString(),
        data_pagamento: new Date(pag.data_pagamento).toLocaleDateString(),
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
