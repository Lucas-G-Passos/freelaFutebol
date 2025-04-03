import db from '../db.js';

async function getByField(table, field, value, orderBy = null, orderDirection = 'ASC') {
    try {
        let query = `SELECT * FROM ${table} WHERE LOWER(${field}) LIKE ?`;

        if (orderBy) {
            query += ` ORDER BY ${orderBy} ${orderDirection}`;
        }
        
        const [rows] = await db.query(query,`%${value.toLowerCase()}%`);
        console.log("Query Result:", rows);

        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error(`DB error on query (${field}) in table (${table}):`, error);
        throw error;
    }
}



async function insertIntoTable(tableName, data) {
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

getByField('alunos', 'nome_completo', 'joão');


export {getByField,insertIntoTable};