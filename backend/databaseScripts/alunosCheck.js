import db from '../db';

async function getAlunoByNome(nome){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE nome = ?',[nome]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByMatricula(matricula){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE id = ?',[matricula]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByPagamento(pagamento){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE situacao_pagamento = ?',[pagamento]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByCPF(cpf){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE cpf = ?',[cpf]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByRG(rg){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE rg = ?',[rg]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByData_Matricula(DMat){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE data_matricula = ?',[DMat]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByTurma(TID){
    try {
        const [row] = await db.query('SELECT * FROM alunos WHERE turma_id = ?',[TID]);
        return row[0] || null
    } catch (error) {
        console.error('DB error on query:',error);
        throw error;
    }
};

async function getAlunoByUltimoPagamento(data) {
    try {
        const [row] = await db.query(`
            SELECT a.* 
            FROM alunos a
            JOIN pagamentos p ON a.id = p.aluno_id
            WHERE p.data_pagamento = ?
            ORDER BY p.data_pagamento DESC
            LIMIT 1
        `, [data]);
        return row[0] || null;
    } catch (error) {
        console.error('DB error on query:', error);
        throw error;
    }
};

export{
    getAlunoByCPF,
    getAlunoByData_Matricula,
    getAlunoByMatricula,
    getAlunoByNome,
    getAlunoByPagamento,
    getAlunoByRG,
    getAlunoByTurma,
    getAlunoByUltimoPagamento
};