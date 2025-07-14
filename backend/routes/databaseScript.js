import {
  getByField,
  getAlunos,
  getEnderecos,
  getPagamentos,
  getResponsaveis,
  getTurmas,
  getInadimplente,
  getAdimplente,
  getInadimplenteNum,
  getNAlunos,
  updateInTable,
  getAniversariantes,
  getFiliais,
} from "./functions/functions.js";

import {
  getNFuncionarios,
  getFuncionarios,
  getAllFuncionario,
} from "./functions/functionFuncionario.js";
import express from "express";
import multer from "multer";
import {
  uploadImage,
  uploadAtestado,
  uploadImageFuncionario,
} from "./../imgKit.js";
import db from "../db.js";
import verifyJWT from "../JWT.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Middleware de validação para inserções
const validateInsertData = async (req, res, next) => {
  const { tableName, data } = req.body;

  try {
    if (tableName === "endereco") {
      // Validação do CEP
      const cep = data.cep?.replace(/-/g, "") || "";
      if (!/^\d{8}$/.test(cep)) {
        return res.status(400).json({
          error: "CEP inválido",
          details: "O CEP deve conter 8 dígitos numéricos",
        });
      }

      // Validação do número
      if (!/^\d{1,6}$/.test(data.numero)) {
        return res.status(400).json({
          error: "Número inválido",
          details: "O número deve conter apenas dígitos (1-6 caracteres)",
        });
      }

      // Normaliza os dados
      req.body.data = {
        ...data,
        cep: cep, // Armazena sem hífen
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Alunos
router.get("/aluno", verifyJWT(["read"]), async (req, res) => {
  try {
    const aluno = await getAlunos();
    res.json(aluno || { message: "No Aluno" });
  } catch (error) {
    console.error("error getting aluno:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Responsáveis
router.get("/responsavel", verifyJWT(["read"]), async (req, res) => {
  try {
    const responsavel = await getResponsaveis();
    res.json(responsavel || { message: "No Responsavel" });
  } catch (error) {
    console.error("error getting responsavel:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Pagamentos
router.get("/pagamento", verifyJWT(["read"]), async (req, res) => {
  try {
    const pagamento = await getPagamentos();
    res.json(pagamento || { message: "No Pagamento" });
  } catch (error) {
    console.error("error getting pagamento:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Endereços
router.get("/endereco", verifyJWT(["read"]), async (req, res) => {
  try {
    const endereco = await getEnderecos();
    res.json(endereco || { message: "No Endereco" });
  } catch (error) {
    console.error("error getting endereco:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Turmas
router.get("/turmas", verifyJWT(["read"]), async (req, res) => {
  try {
    const turmas = await getTurmas();
    res.json(turmas || { message: "No Turmas" });
  } catch (error) {
    console.error("error getting turmas:", error);
    res.status(500).json({ error: "Query falha" });
  }
});
router.get("/filial", verifyJWT(["read"]), async (req, res) => {
  try {
    const filial = await getFiliais();
    res.json(filial || { message: "no filial" });
  } catch (error) {
    console.error("error getting filial:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

router.get("/aluno/total", verifyJWT(["read"]), async (req, res) => {
  try {
    const total = await getNAlunos();
    res.json({
      total: total || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch student count",
    });
  }
});
router.get("/funcionario/total", verifyJWT(["read"]), async (req, res) => {
  try {
    const total = await getNFuncionarios();
    res.json({
      total: total || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to get funcionario count",
    });
  }
});

router.get("/aluno/inadimplente", verifyJWT(["read"]), async (req, res) => {
  try {
    const inadimplente = await getInadimplente();
    res.json(inadimplente || { message: "No Inadimplentes" });
  } catch (error) {
    console.error("error getting inadimplentes:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

router.get("/aluno/adimplente", verifyJWT(["read"]), async (req, res) => {
  try {
    const adimplente = await getAdimplente();
    res.json(adimplente || { message: "No adimplente" });
  } catch (error) {
    console.error("error getting adimplentes:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

router.get("/aluno/inadimplente/total", verifyJWT(["read"]), async (req, res) => {
  try {
    const inadimplenteCount = await getInadimplenteNum();
    res.json(inadimplenteCount || { message: "none" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "falha query" });
  }
});

router.post("/aluno/check", verifyJWT(["read"]), async (req, res) => {
  const { field, value } = req.body;

  try {
    const aluno = await getByField("alunos", field, value);
    res.json(aluno || { message: "Aluno não encontrado" });
  } catch (error) {
    console.error("Error fetching aluno:", error);
    res.status(500).json({ error: "Falha na busca" });
  }
});
router.post("/funcionario/check", verifyJWT(["read"]), async (req, res) => {
  const { field, value } = req.body;
  try {
    const funcionario = await getFuncionarios(field, value);
    res.json(funcionario || { message: "Funcionario não encontrado" });
  } catch (error) {
    console.error("error fetching funcionario: ", error);
  }
});
router.get("/funcionario", verifyJWT(["read"]), async (req, res) => {
  try {
    const funcionario = await getAllFuncionario();
    res.json(funcionario || { message: "Funcionario não encontrado" });
  } catch (error) {
    console.error("error fetching funcionario: ", error);
    throw new Error("Erro ao buscar funcionario: ", error);
  }
});

router.post("/insert", verifyJWT(["write"]), async (req, res) => {
  const { tableName, data } = req.body;
  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    switch (tableName) {
      case "endereco":
        if (!data.estado || data.estado.length !== 2) {
          throw {
            code: "INVALID_STATE",
            message: "Estado é obrigatório (2 caracteres)",
            field: "estado",
          };
        }
        break;

      case "alunos":
        if (!data.id_endereco) {
          throw {
            code: "MISSING_FIELD",
            message: "ID do endereço é obrigatório",
            field: "id_endereco",
          };
        }
        break;
    }

    const [result] = await conn.query(`INSERT INTO ${tableName} SET ?`, [data]);
    await conn.commit();

    const [newRecord] = await conn.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [result.insertId]
    );

    res.json({
      success: true,
      data: newRecord[0],
      message: `${tableName} inserido com sucesso`,
    });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error(`Erro na inserção (${tableName}):`, error);

    const response = {
      success: false,
      error: error.code || "DATABASE_ERROR",
      message: error.message || "Erro no banco de dados",
      field: error.field || null,
    };

    if (error.code === "ER_NO_DEFAULT_FOR_FIELD") {
      response.message = `Campo obrigatório faltando: ${
        error.sqlMessage.match(/Field '(.+)'/i)?.[1]
      }`;
    }

    res.status(400).json(response);
  } finally {
    if (conn) conn.release();
  }
});
router.post("/funcionario/update", verifyJWT(["edit", "read"]), async (req, res) => {
  const { funcionario, endereco } = req.body;
  const c = await db.getConnection();
  try {
    await c.beginTransaction();

    await c.query(
      `UPDATE endereco 
   SET cep = ?, cidade = ?, estado = ?, rua = ?, numero = ? 
   WHERE id = ?`,
      [
        endereco.cep,
        endereco.cidade,
        endereco.estado,
        endereco.rua,
        endereco.numero,
        endereco.id,
      ]
    );

    await c.query(
      `UPDATE funcionarios 
       SET
           cargo = ?,
           telefone1 = ?, 
           telefone2 = ?, 
           foto = ?, 
           jornada_escala = ?, 
           situacao = ?
       WHERE id = ?`,
      [
        funcionario.cargo,
        funcionario.telefone1,
        funcionario.telefone2,
        funcionario.foto,
        funcionario.jornada_escala,
        funcionario.situacao,
        funcionario.id,
      ]
    );

    const [rows] = await c.query(
      `SELECT 
      f.id,
      f.nome_completo,
      f.data_nascimento,
      f.telefone1,
      f.telefone2,
      f.cargo,
      f.rg,
      f.cpf,
      f.data_admissao,
      f.foto,
      f.jornada_escala,
      f.situacao,
      fil.nome AS filial_nome,
      func_endereco.cep,
      func_endereco.cidade,
      func_endereco.estado,
      func_endereco.rua,
      func_endereco.numero AS numero_rua,
      func_endereco.id AS endereco_id
    FROM 
      funcionarios f
    LEFT JOIN filial fil 
      ON f.id_filial = fil.id
    LEFT JOIN endereco func_endereco 
      ON f.id_endereco = func_endereco.id
    WHERE f.id = ?`,
      [funcionario.id]
    );
    await c.commit();
    res.status(200).json(rows[0]);
  } catch (error) {
    await c.rollback();
    res.status(500).json({ error: "Erro interno ao atualizar funcionário" });
    console.error("Erro ao atualizar funcionario: ", error);
  } finally {
    c.release();
  }
});
router.put("/aluno/update", verifyJWT(["edit", "read"]), async (req, res) => {
  const { aluno, endereco, responsavel } = req.body;

  if (!aluno?.id || !endereco?.id) {
    return res.status(400).json({ error: "IDs obrigatórios não fornecidos" });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Validação do CEP (mantida)
    if (endereco.cep) {
      const cepRaw = endereco.cep.replace(/-/g, "");
      if (!/^\d{8}$/.test(cepRaw)) {
        await conn.rollback();
        return res.status(400).json({
          error: "CEP inválido na atualização",
          details: "O CEP deve conter 8 dígitos numéricos",
        });
      }
      endereco.cep = cepRaw;
    }

    // Atualiza endereço (mantida)
    await conn.query(
      `UPDATE endereco SET estado = ?, cidade = ?, rua = ?, cep = ? WHERE id = ?`,
      [
        endereco.estado,
        endereco.cidade,
        endereco.rua,
        endereco.cep,
        endereco.id,
      ]
    );

    // Atualiza aluno (SEM id_endereco - já está vinculado)
    await conn.query(
      `UPDATE alunos SET 
        nome_completo = ?, telefone1 = ?, telefone2 = ?, rg = ?, cpf = ?, convenio = ?,
        alergia = ?, uso_medicamento = ?, medicamento_horario = ?, atestado_medico = ?,
        colegio = ?, colegio_ano = ?, time_coracao = ?, indicacao = ?, observacao = ?,
        ativo = ?, foto = ?, id_turma = ?
      WHERE id = ?`,
      [
        aluno.nome_completo,
        aluno.telefone1,
        aluno.telefone2,
        aluno.rg,
        aluno.cpf,
        aluno.convenio,
        aluno.alergia,
        aluno.uso_medicamento,
        aluno.medicamento_horario,
        aluno.atestado_medico,
        aluno.colegio,
        aluno.colegio_ano,
        aluno.time_coracao,
        aluno.indicacao,
        aluno.observacao,
        aluno.ativo,
        aluno.foto,
        aluno.id_turma,
        aluno.id,
      ]
    );

    // Atualização do responsável (mantida)
    if (responsavel && responsavel.id) {
      await conn.query(
        `UPDATE responsaveis SET nome = ?, cpf = ?, rg = ?, grau_parentesco = ? WHERE id = ?`,
        [
          responsavel.nome,
          responsavel.cpf,
          responsavel.rg,
          responsavel.grau_parentesco,
          responsavel.id,
        ]
      );
    }

    await conn.commit();

    // Consulta final CORRIGIDA (JOIN com id_endereco)
    const [rows] = await conn.query(
      `SELECT a.*, e.estado, e.cidade, e.rua, e.cep, 
              r.nome AS responsavel_nome, r.cpf AS responsavel_cpf, r.rg AS responsavel_rg, r.grau_parentesco
       FROM alunos a
       JOIN endereco e ON e.id = a.id_endereco
       LEFT JOIN responsaveis r ON r.id_aluno = a.id
       WHERE a.id = ?`,
      [aluno.id]
    );

    res.json(rows[0]);
  } catch (error) {
    await conn.rollback();
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  } finally {
    conn.release();
  }
});

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/funcionario/insertImage",
  verifyJWT(["write"]),
  upload.single("foto"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" });
      }
      const fotoUrl = await uploadImageFuncionario(file);
      res.json({ fotoUrl });
    } catch (error) {
      console.error("Erro no upload da imagem: ", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/aluno/insertimage", verifyJWT(["write"]), upload.single("foto"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Nenhuma imagem enviada" });
    }

    const fotoUrl = await uploadImage(file);
    res.json({ fotoUrl });
  } catch (error) {
    console.error("Erro no upload da imagem:", error);
    res.status(500).json({ error: error.message });
  }
});
router.post(
  "/aluno/insert/atestados",
  verifyJWT(["write"]),
  upload.single("foto"),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Nenhuma imagem enviada" });
      }

      const fotoUrl = await uploadAtestado(file);
      res.json({ fotoUrl });
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/aluno/aniversariantes", verifyJWT(["read"]), async (req, res) => {
  try {
    const aniversariantes = await getAniversariantes();
    res.json(aniversariantes || { message: "Nenhum aniversariante" });
  } catch (error) {
    console.error("Erro ao buscar Aniversariantes" + error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/turmas/update", verifyJWT(["edit", "read"]), async (req, res) => {
  const { turma } = req.body;
  const c = await db.getConnection();
  try {
    await c.beginTransaction();
    await c.query(
      `UPDATE turmas
                  SET
                    nome = ?,
                    codigo_turma = ?,
                    descricao = ?,
                    dias_semana = ?,
                    hora_inicio = ?,
                    hora_termino = ?,
                    sala = ?
                  WHERE id = ?;
`,
      [
        turma.nome,
        turma.codigo_turma,
        turma.descricao,
        Array.isArray(turma.dias_semana)
          ? turma.dias_semana.join(",")
          : turma.dias_semana,
        turma.hora_inicio,
        turma.hora_termino,
        turma.sala,
        turma.id,
      ]
    );

    const rows = await c.query(`SELECT * FROM turmas WHERE id = ?`, [turma.id]);
    await c.commit();
    res.status(200).json(rows);
  } catch (error) {
    await c.rollback();
    res.status(500).json({ error: "erro interno ao atualizar funcionário" });
    console.error("erro interno ao atualizar turma:", error);
  } finally {
    c.release();
  }
});

router.post("/turmas/delete", verifyJWT(["delete"]), async (req, res) => {
  const { id, nome } = req.body;
  if (!id || !nome)
    return res.status(400).json({ error: "Dados incompletos." });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Obter todos os alunos da turma
    const [alunos] = await conn.query(
      "SELECT id, id_endereco FROM alunos WHERE id_turma = ?",
      [id]
    );
    const alunoIds = alunos.map((a) => a.id);
    const enderecoIds = alunos.map((a) => a.id_endereco);

    if (alunoIds.length > 0) {
      // 2. Deletar pagamentos dos responsáveis desses alunos
      await conn.query(
        `
        DELETE p FROM pagamentos p
        JOIN responsaveis r ON p.responsavel_id = r.id
        WHERE r.id_aluno IN (?)`,
        [alunoIds]
      );

      // 3. Deletar responsáveis
      await conn.query("DELETE FROM responsaveis WHERE id_aluno IN (?)", [
        alunoIds,
      ]);

      // 4. Deletar os alunos
      await conn.query("DELETE FROM alunos WHERE id IN (?)", [alunoIds]);

      // 5. Opcional: deletar endereços se não forem usados por outros
      if (enderecoIds.length > 0) {
        await conn.query("DELETE FROM endereco WHERE id IN (?)", [enderecoIds]);
      }
    }

    // 6. Deletar a turma
    await conn.query("DELETE FROM turmas WHERE id = ? AND nome = ?", [
      id,
      nome,
    ]);

    await conn.commit();
    res.json({
      success: true,
      message: "Turma e dados relacionados foram deletados.",
    });
  } catch (err) {
    await conn.rollback();
    console.error("Erro ao deletar turma:", err);
    res.status(500).json({ error: "Erro interno ao deletar turma." });
  } finally {
    conn.release();
  }
});

export default router;
