import db from '../db.js';

// Retorna todos os alunos
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
    console.error('db error (alunos):', error);
    throw error;
  }
}


// Retorna número total de alunos
async function getNAlunos() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS total FROM alunos');
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Retorna todos os responsáveis
async function getResponsaveis() {
  try {
    const [rows] = await db.query(`SELECT * FROM responsavel`);
    return rows;
  } catch (error) {
    console.error('db error (responsavel):', error);
    throw error;
  }
}

// Retorna todos os pagamentos
async function getPagamentos() {
  try {
    const [rows] = await db.query(`SELECT * FROM pagamento`);
    return rows;
  } catch (error) {
    console.error('db error (pagamento):', error);
    throw error;
  }
}

// Retorna todos os endereços
async function getEnderecos() {
  try {
    const [rows] = await db.query(`SELECT * FROM endereco`);
    return rows;
  } catch (error) {
    console.error('db error (endereco):', error);
    throw error;
  }
}

// Retorna todas as turmas
async function getTurmas() {
  try {
    const [rows] = await db.query(`SELECT * FROM turmas`);
    return rows;
  } catch (error) {
    console.error('db error (turmas):', error);
    throw error;
  }
}

// Retorna alunos adimplentes (data de vencimento no futuro)
async function getAdimplente() {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id AS id_aluno,
        a.nome_completo AS nome_aluno,
        a.cpf,
        r.nome AS nome_responsavel,
        p.valor_mensalidade,
        p.data_vencimento
      FROM alunos a
      JOIN responsaveis r ON a.id_responsavel = r.id
      JOIN pagamentos p ON p.responsavel_id = r.id
      WHERE p.data_vencimento >= CURDATE();
    `);
    return rows;
  } catch (err) {
    console.error('Erro ao buscar adimplentes:', err);
    throw err;
  }
}

// Retorna alunos inadimplentes
async function getInadimplente() {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id AS id_aluno,
        a.nome_completo AS nome_aluno,
        a.cpf,
        r.nome AS nome_responsavel,
        p.valor_mensalidade,
        p.data_vencimento
      FROM alunos a
      JOIN responsaveis r ON a.id_responsavel = r.id
      JOIN pagamentos p ON p.responsavel_id = r.id
      WHERE p.data_vencimento < CURDATE();
    `);
    return rows;
  } catch (err) {
    console.error('Erro ao buscar inadimplentes:', err);
    throw err;
  }
}

// Retorna o número de inadimplentes
async function getInadimplenteNum() {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(DISTINCT a.id) AS total
      FROM alunos a
      JOIN responsaveis r ON a.id_responsavel = r.id
      JOIN pagamentos p ON p.responsavel_id = r.id
      WHERE p.data_vencimento < CURDATE();
    `);
    return rows[0];
  } catch (err) {
    console.error('Erro ao contar inadimplentes:', err);
    throw err;
  }
}









// Updated getByField function with proper encoding and search handling
async function getByField(table, field, value, orderBy = null, orderDirection = 'ASC') {
  try {
    let query;
    let params;

    if (table === 'alunos') {
      // Main search query with proper collation
      query = `
        SELECT 
          a.id,
          a.nome_completo,
          a.cpf,
          t.nome AS nome_turma,
          COALESCE(r.nome, 'Sem responsável') AS nome_responsavel
        FROM alunos a
        LEFT JOIN turmas t ON a.id_turma = t.id
        LEFT JOIN responsaveis r ON a.id_responsavel = r.id
        WHERE a.nome_completo COLLATE utf8mb4_unicode_ci LIKE ?
      `;
      params = [`%${value}%`]; // Partial match with original casing

      // Handle numeric fields differently
      if (['cpf', 'rg', 'matricula'].includes(field)) {
        query = query.replace('LIKE ?', '= ?');
        params = [value]; // Exact match for numeric fields
      }

      // Turma search by ID
      if (field === 'turma') {
        query = `
          SELECT 
            a.id,
            a.nome_completo,
            a.cpf,
            t.nome AS nome_turma,
            COALESCE(r.nome, 'Sem responsável') AS nome_responsavel
          FROM alunos a
          LEFT JOIN turmas t ON a.id_turma = t.id
          LEFT JOIN responsaveis r ON a.id_responsavel = r.id
          WHERE a.id_turma = ?
        `;
        params = [value];
      }
    } else {
      // Generic table handling
      query = `SELECT * FROM ${table} WHERE ${field} COLLATE utf8mb4_unicode_ci LIKE ?`;
      params = [`%${value}%`];
    }

    const [rows] = await db.query(query, params);
    return rows.length > 0 ? rows : null;

  } catch (error) {
    console.error(`DB error on query (${field}) in table (${table}):`, error);
    throw error;
  }
}



async function insertIntoTable(tableName, data) {
  // Lista de tabelas permitidas
  const allowedTables = ['alunos', 'responsavel', 'endereco', 'pagamento', 'turmas'];

  if (!allowedTables.includes(tableName)) {
    throw new Error(`Tabela inválida: ${tableName}`);
  }

  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    const [result] = await db.execute(query, values);
    return { id: result.insertId, message: `${tableName} inserido com sucesso!` };
  } catch (error) {
    console.error(`Erro ao inserir na tabela ${tableName}:`, error);
    throw error;
  }
}




export { getByField, insertIntoTable, getAlunos, getEnderecos, getPagamentos, getResponsaveis, getTurmas, getInadimplente, getAdimplente, getNAlunos, getInadimplenteNum };