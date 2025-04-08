import db from '../db.js';

async function getAlunos() {
    try {
      const query = `SELECT * FROM alunos`;
      return await db.query(query);
    } catch (error) {
      console.error('db error (alunos):', error);
      throw error;
    }
  }
  
  async function getResponsaveis() {
    try {
      const query = `SELECT * FROM responsavel`;
      return await db.query(query);
    } catch (error) {
      console.error('db error (responsavel):', error);
      throw error;
    }
  }
  
  async function getPagamentos() {
    try {
      const query = `SELECT * FROM pagamento`;
      return await db.query(query);
    } catch (error) {
      console.error('db error (pagamento):', error);
      throw error;
    }
  }
  
  async function getEnderecos() {
    try {
      const query = `SELECT * FROM endereco`;
      return await db.query(query);
    } catch (error) {
      console.error('db error (endereco):', error);
      throw error;
    }
  }
  
  async function getTurmas() {
    try {
      const query = `SELECT * FROM turmas`;
      const run = await db.query(query);
      return run;
    } catch (error) {
      console.error('db error (turmas):', error);
      throw error;
    }
  }










async function getByField(table, field, value, orderBy = null, orderDirection = 'ASC') {
    try {
        let query = `SELECT * FROM ${table} WHERE LOWER(${field}) LIKE ?`;

        if (orderBy) {
            query += ` ORDER BY ${orderBy} ${orderDirection}`;
        }
        
        const [rows] = await db.query(query,`%${value.toLowerCase()}%`);

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
  



export {getByField,insertIntoTable,getAlunos,getEnderecos,getPagamentos,getResponsaveis,getTurmas};