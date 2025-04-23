import db from "../../db.js";

async function getAlunoDetalhadoQuery(situacao = null) {
  let filtroPagamento = "";

  if (situacao === "adimplente") {
    filtroPagamento = `
      AND (p.status = 'pago' OR p.data_vencimento >= CURDATE())
    `;
  } else if (situacao === "inadimplente") {
    filtroPagamento = `
      AND p.data_vencimento < CURDATE()
      AND p.status != 'pago'
    `;
  }

  const [rows] = await db.query(`
    SELECT 
    a.id AS aluno_id,
    a.nome_completo,
    a.data_nascimento,
    a.data_matricula,
    a.telefone1,
    a.telefone2,
    a.foto,
    a.rg,
    a.cpf,
    a.convenio,
    a.alergia,
    a.uso_medicamento,
    a.medicamento_horario,
    a.atestado_medico,
    a.colegio,
    a.colegio_ano,
    a.time_coracao,
    a.indicacao,
    a.observacao,
    a.ativo,
    t.nome AS nome_turma,
    r.id AS responsavel_id,
    COALESCE(r.nome, 'Sem responsável') AS nome_responsavel,
    e.id AS endereco_id,
    e.cep,
    e.cidade,
    e.estado,
    e.numero,
    e.rua,
    ${
      situacao
        ? `'${situacao.charAt(0).toUpperCase() + situacao.slice(1)}'`
        : "NULL"
    } AS situacao_pagamento
  FROM alunos a
  JOIN responsaveis r ON r.id_aluno = a.id
  JOIN pagamentos p ON p.responsavel_id = r.id
  LEFT JOIN turmas t ON a.id_turma = t.id
  JOIN endereco e ON a.id_endereco = e.id
  WHERE a.ativo = 'Ativo'
  ${filtroPagamento}`);

  return rows;
}

async function getAdimplente() {
  return await getAlunoDetalhadoQuery("adimplente");
}

async function getInadimplente() {
  return await getAlunoDetalhadoQuery("inadimplente");
}

async function getAlunos() {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.nome_completo,
        a.cpf,
        t.nome AS nome_turma
      FROM alunos a
      JOIN turmas t ON a.id_turma = t.id
    `);
    return rows;
  } catch (error) {
    console.error("db error (alunos):", error);
    throw error;
  }
}

async function getNAlunos() {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM alunos");
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getResponsaveis() {
  try {
    const [rows] = await db.query(`SELECT * FROM responsaveis`);
    return rows;
  } catch (error) {
    console.error("db error (responsaveis):", error);
    throw error;
  }
}

async function getPagamentos() {
  try {
    const [rows] = await db.query(`SELECT * FROM pagamento`);
    return rows;
  } catch (error) {
    console.error("db error (pagamento):", error);
    throw error;
  }
}

async function getEnderecos() {
  try {
    const [rows] = await db.query(`SELECT * FROM endereco`);
    return rows;
  } catch (error) {
    console.error("db error (endereco):", error);
    throw error;
  }
}

async function getTurmas() {
  try {
    const [rows] = await db.query(`SELECT * FROM turmas`);
    return rows;
  } catch (error) {
    console.error("db error (turmas):", error);
    throw error;
  }
}

async function getInadimplenteNum() {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(DISTINCT a.id) AS total
      FROM alunos a
      JOIN responsaveis r ON r.id_aluno = a.id
      JOIN pagamentos p ON p.responsavel_id = r.id
      WHERE p.data_vencimento < CURDATE()
        AND p.status != 'pago'
        AND a.ativo = 'Ativo';
    `);
    return rows[0];
  } catch (err) {
    console.error("Erro ao contar inadimplentes:", err);
    throw err;
  }
}

async function getByField(
  table,
  field,
  value,
  orderBy = null,
  orderDirection = "ASC"
) {
  try {
    if (table === "alunos") {
      let query = `
        SELECT 
  a.id AS aluno_id,
  a.id_turma, -- ✅ Campo adicionado
  a.nome_completo,
  a.data_nascimento,
  a.data_matricula,
  a.telefone1,
  a.telefone2,
  a.foto,
  a.rg,
  a.cpf,
  a.convenio,
  a.alergia,
  a.uso_medicamento,
  a.medicamento_horario,
  a.atestado_medico,
  a.colegio,
  a.colegio_ano,
  a.time_coracao,
  a.indicacao,
  a.observacao,
  a.ativo,
  t.nome AS nome_turma,
  -- Campos de responsáveis
  r.id AS responsavel_id,
  r.nome AS responsavel_nome,
  r.rg AS responsavel_rg,
  r.cpf AS responsavel_cpf,
  r.grau_parentesco,
  -- Campos de endereço
  e.id AS endereco_id,
  e.cep,
  e.cidade,
  e.estado,
  e.numero,
  e.rua,
  -- Lógica de situação de pagamento
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM responsaveis r2
      JOIN pagamentos p ON p.responsavel_id = r2.id
      WHERE r2.id_aluno = a.id AND (p.status = 'pago' OR p.data_vencimento >= CURDATE())
    ) THEN 'Adimplente'
    ELSE 'Inadimplente'
  END AS situacao_pagamento
FROM alunos a
LEFT JOIN turmas t ON a.id_turma = t.id -- Join com turmas
JOIN endereco e ON a.id_endereco = e.id
LEFT JOIN responsaveis r ON r.id_aluno = a.id
WHERE a.${field} COLLATE utf8mb4_unicode_ci LIKE ?`;
      let params = [`%${value}%`];
      if (["cpf", "rg", "matricula"].includes(field)) {
        query = query.replace("LIKE ?", "= ?");
        params = [value];
      }

      if (field === "turma") {
        query = `
          SELECT 
            a.nome_completo,
            a.data_nascimento,
            a.data_matricula,
            a.telefone1,
            a.telefone2,
            a.foto,
            a.rg,
            a.cpf,
            a.convenio,
            a.alergia,
            a.uso_medicamento,
            a.medicamento_horario,
            a.atestado_medico,
            a.colegio,
            a.colegio_ano,
            a.time_coracao,
            a.indicacao,
            a.observacao,
            a.ativo,
            t.nome AS nome_turma,
            (SELECT nome FROM responsaveis r WHERE r.id_aluno = a.id LIMIT 1) AS nome_responsavel,
            e.cep,
            e.cidade,
            e.estado,
            e.numero,
            e.rua,
            CASE 
              WHEN EXISTS (
                SELECT 1 FROM responsaveis r2
                JOIN pagamentos p ON p.responsavel_id = r2.id
                WHERE r2.id_aluno = a.id AND (p.status = 'pago' OR p.data_vencimento >= CURDATE())
              ) THEN 'Adimplente'
              ELSE 'Inadimplente'
            END AS situacao_pagamento
          FROM alunos a
          LEFT JOIN turmas t ON a.id_turma = t.id
          JOIN endereco e ON a.id_endereco = e.id
          WHERE t.id = ?;
        `;
        params = [value];
      }

      const [rows] = await db.query(query, params);
      return rows.length > 0 ? rows : null;
    } else {
      const query = `SELECT * FROM ${table} WHERE ${field} COLLATE utf8mb4_unicode_ci LIKE ?`;
      const params = [`%${value}%`];
      const [rows] = await db.query(query, params);
      return rows.length > 0 ? rows : null;
    }
  } catch (error) {
    console.error(`DB error on query (${field}) in table (${table}):`, error);
    throw error;
  }
}

async function insertIntoTable(tableName, data) {
  const allowedTables = [
    "alunos",
    "responsaveis",
    "endereco",
    "pagamentos",
    "turmas",
  ];

  if (!allowedTables.includes(tableName)) {
    throw new Error(`Tabela inválida: ${tableName}`);
  }

  try {
    const sql = `INSERT INTO ${tableName} SET ?`;
    const [result] = await db.query(sql, data); // Desestruturação aqui
    return result; // Retorna o objeto de resultado diretamente
  } catch (error) {
    console.error(`Erro ao inserir na tabela ${tableName}:`, error);
    throw error;
  }
}

async function updateInTable(tableName, data, id) {
  const allowedTables = [
    "alunos",
    "responsaveis",
    "endereco",
    "pagamentos",
    "turmas",
    "funcionarios",
  ];

  if (!allowedTables.includes(tableName)) {
    throw new Error(`Invalid table: ${tableName}`);
  }

  try {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(data), id];

    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error updating ${tableName}:`, error);
    throw error;
  }
}

async function getCompleteAluno(id) {
  try {
    const [aluno] = await db.query(
      `
      SELECT 
        a.*, 
        e.id AS endereco_id,
        e.cep,
        e.cidade,
        e.estado,
        e.numero,
        e.rua,
        r.id AS responsavel_id,
        r.nome AS responsavel_nome
      FROM alunos a
      LEFT JOIN endereco e ON a.id_endereco = e.id
      LEFT JOIN responsaveis r ON r.id_aluno = a.id
      WHERE a.id = ?
    `,
      [id]
    );

    return aluno[0] || null;
  } catch (error) {
    console.error("Error fetching complete aluno:", error);
    throw error;
  }
}

export {
  getCompleteAluno,
  updateInTable,
  getByField,
  insertIntoTable,
  getAlunos,
  getEnderecos,
  getPagamentos,
  getResponsaveis,
  getTurmas,
  getInadimplente,
  getAdimplente,
  getNAlunos,
  getInadimplenteNum,
};
