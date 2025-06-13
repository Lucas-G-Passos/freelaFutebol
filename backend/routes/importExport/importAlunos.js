import db from "./../../db.js";
import express from "express";
import multer from "multer";
import * as XLSX from "xlsx";

const routerImport = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

routerImport.use(express.json());
routerImport.use(express.urlencoded({ extended: true }));

function sanitize(value) {
  return value === undefined ? null : value;
}

function formatDate(input) {
  if (!input || typeof input !== "string") return null;
  const [day, month, year] = input.split("/");
  if (!day || !month || !year) return null;
  return `${year}-${month}-${day}`;
}

routerImport.post("/aluno/import", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const workBook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workBook.SheetNames[0];
    const worksheet = workBook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    const sectionNames = ["endereco", "aluno", "responsavel", "pagamento"];

    const structuredData = rawData.map((row) => {
      const result = {};
      let sectionIndex = 0;
      let currentSection = sectionNames[sectionIndex];
      result[currentSection] = {};

      for (const [key, value] of Object.entries(row)) {
        if (key.startsWith("__EMPTY")) {
          sectionIndex++;
          currentSection =
            sectionNames[sectionIndex] || `section${sectionIndex + 1}`;
          result[currentSection] = {};
        } else {
          result[currentSection][key] = value;
        }
      }
      return result;
    });

    for (const record of structuredData) {
      let c = await db.getConnection();
      await c.beginTransaction();

      try {
        const [enderecoResult] = await c.query(
          `INSERT INTO endereco 
          (cep, cidade, estado, numero, rua, complemento) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            record.endereco.CEP.replace(/\D/g, "").substring(0, 8),
            record.endereco.cidade,
            record.endereco.estado,
            record.endereco.numero,
            record.endereco.rua,
            record.endereco.complemento,
          ]
        );
        const enderecoId = enderecoResult.insertId;

        const [alunoResult] = await c.query(
          `INSERT INTO alunos 
          (id_endereco, id_turma, nome_completo, data_nascimento, data_matricula, 
          telefone1, telefone2, rg, cpf, convenio, alergia, uso_medicamento, 
          medicamento_horario, atestado_medico, colegio, colegio_ano, 
          time_coracao, indicacao, observacao, ativo, foto) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            enderecoId,
            record.aluno.id_turma,
            record.aluno.nome_completo,
            formatDate(record.aluno.data_nascimento),
            formatDate(record.aluno.data_matricula),
            record.aluno.telefone1,
            record.aluno.telefone2,
            record.aluno.rg,
            record.aluno.cpf,
            record.aluno.convenio,
            record.aluno.alergia,
            record.aluno.uso_medicamento,
            record.aluno.medicamento_horario,
            null,
            record.aluno.colegio,
            record.aluno.colegio_ano,
            record.aluno.time_coracao,
            record.aluno.indicacao,
            record.aluno.observacao,
            "Ativo",
            null,
          ]
        );
        const alunoId = alunoResult.insertId;

        const [responsavelResult] = await c.query(
          `INSERT INTO responsaveis 
          (id_aluno, nome, rg, cpf, grau_parentesco) 
          VALUES (?, ?, ?, ?, ?)`,
          [
            alunoId,
            record.responsavel.nome,
            record.responsavel.rg_1.toString(),
            record.responsavel.cpf_1.toString(),
            record.responsavel.grau_parentesco,
          ]
        );
        const responsavelId = responsavelResult.insertId;

        await c.query(
          `INSERT INTO pagamentos 
          (data_vencimento, data_pagamento, valor_mensalidade, valor_uniforme, 
          status, juros, responsavel_id, tipo) 
          VALUES (?, NULL, ?, ?, 'pendente', 0.00, ?, ?)`,
          [
            formatDate(record.pagamento.data_vencimento),
            record.pagamento.valor_mensalidade,
            record.pagamento.valor_uniforme,
            responsavelId,
            record.pagamento.tipo,
          ]
        );

        await c.commit();
      } catch (error) {
        await c.rollback();
        throw error;
      } finally {
        c.release();
      }
    }

    res.json({
      success: true,
      message: `Imported ${structuredData.length} records successfully`,
    });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({
      success: false,
      message: `Error during import: ${error.message}`,
    });
  }
});

export default routerImport;
