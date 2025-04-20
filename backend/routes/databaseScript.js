import {
  getByField,
  insertIntoTable,
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
} from "./functions.js";
import express from "express";
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
router.get("/aluno", async (req, res) => {
  try {
    const aluno = await getAlunos();
    res.json(aluno || { message: "No Aluno" });
  } catch (error) {
    console.error("error getting aluno:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Responsáveis
router.get("/responsavel", async (req, res) => {
  try {
    const responsavel = await getResponsaveis();
    res.json(responsavel || { message: "No Responsavel" });
  } catch (error) {
    console.error("error getting responsavel:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Pagamentos
router.get("/pagamento", async (req, res) => {
  try {
    const pagamento = await getPagamentos();
    res.json(pagamento || { message: "No Pagamento" });
  } catch (error) {
    console.error("error getting pagamento:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Endereços
router.get("/endereco", async (req, res) => {
  try {
    const endereco = await getEnderecos();
    res.json(endereco || { message: "No Endereco" });
  } catch (error) {
    console.error("error getting endereco:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

// Turmas
router.get("/turmas", async (req, res) => {
  try {
    const turmas = await getTurmas();
    res.json(turmas || { message: "No Turmas" });
  } catch (error) {
    console.error("error getting turmas:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

router.get("/aluno/total", async (req, res) => {
  try {
    const total = await getNAlunos();
    res.json(total || { message: "Nenhum Aluno" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "query falha" });
  }
});

router.get("/aluno/inadimplente", async (req, res) => {
  try {
    const inadimplente = await getInadimplente();
    res.json(inadimplente || { message: "No Inadimplentes" });
  } catch (error) {
    console.error("error getting inadimplentes:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

router.get("/aluno/adimplente", async (req, res) => {
  try {
    const adimplente = await getAdimplente();
    res.json(adimplente || { message: "No adimplente" });
  } catch (error) {
    console.error("error getting adimplentes:", error);
    res.status(500).json({ error: "Query falha" });
  }
});

router.get("/aluno/inadimplente/total", async (req, res) => {
  try {
    const inadimplenteCount = await getInadimplenteNum();
    res.json(inadimplenteCount || { message: "none" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "falha query" });
  }
});

router.post("/aluno/check", async (req, res) => {
  const { field, value } = req.body;

  try {
    const aluno = await getByField("alunos", field, value);
    res.json(aluno || { message: "Aluno não encontrado" });
  } catch (error) {
    console.error("Error fetching aluno:", error);
    res.status(500).json({ error: "Falha na busca" });
  }
});

router.post("/funcionario/check", async (req, res) => {
  const { field, value } = req.body;

  try {
    let funcionario;
    funcionario = await getByField("funcionarios", field, value);
    res.json(funcionario || { message: "funcionario not found" });
  } catch (error) {
    console.error("Error fetching aluno:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.post("/insert", validateInsertData, async (req, res) => {
  const { tableName, data } = req.body;
  console.log("Recebendo dados validados:", req.body);

  try {
    const result = await insertIntoTable(tableName, data);
    res.json({
      success: true,
      id: result.insertId,
      message: `${tableName} inserido com sucesso`,
    });
  } catch (error) {
    console.error(`Erro na inserção (${tableName}):`, error);

    const response = {
      error: "Erro no banco de dados",
      details: error.message,
    };

    if (error.code === "ER_DATA_TOO_LONG") {
      response.details = "Dados excedem o tamanho permitido";
      response.field = error.sqlMessage.match(/column '(.+)'/i)?.[1];
    }

    res.status(500).json(response);
  }
});

router.put("/aluno/update", async (req, res) => {
  const { aluno, endereco, responsavel } = req.body;

  if (!aluno?.id || !endereco?.id || !responsavel?.id) {
    return res.status(400).json({ error: "IDs obrigatórios não fornecidos" });
  }

  try {
    // Validação do endereço na atualização
    if (endereco.cep) {
      const cep = endereco.cep.replace(/-/g, "");
      if (!/^\d{8}$/.test(cep)) {
        return res.status(400).json({
          error: "CEP inválido na atualização",
          details: "O CEP deve conter 8 dígitos numéricos",
        });
      }
      endereco.cep = cep;
    }

    const alunoSuccess = await updateInTable("alunos", aluno, aluno.id);
    const enderecoSuccess = await updateInTable(
      "endereco",
      endereco,
      endereco.id
    );
    const responsavelSuccess = await updateInTable(
      "responsaveis",
      responsavel,
      responsavel.id
    );

    if (alunoSuccess && enderecoSuccess && responsavelSuccess) {
      res.json({ message: "Dados atualizados com sucesso!" });
    } else {
      res
        .status(500)
        .json({ error: "Falha ao atualizar um ou mais registros" });
    }
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
});

export default router;
