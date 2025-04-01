import {
    getAlunoByCPF,
    getAlunoByData_Matricula,
    getAlunoByMatricula,
    getAlunoByNome,
    getAlunoByPagamento,
    getAlunoByRG,
    getAlunoByTurma,
    getAlunoByUltimoPagamento
} from './alunosCheck.js'
import express from 'express';
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/alunoCheck', async (req, res) => {
    const { type, value } = req.body;

    try {
        let aluno
        switch (type) {
            case "cpf":
                aluno = await getAlunoByCPF(value);
                break;
            case "nome":
                aluno = await getAlunoByNome(value);
                break;
            case "matricula":
                aluno = await getAlunoByMatricula(value);
                break;
            case "pagamento":
                aluno = await getAlunoByPagamento(value);
                break;
            case "rg":
                aluno = await getAlunoByRG(value);
                break;
            case "data_matricula":
                aluno = await getAlunoByData_Matricula(value);
                break;
            case "turma":
                aluno = await getAlunoByTurma(value);
                break;
            case "ultimo_pagamento":
                aluno = await getAlunoByUltimoPagamento(value);
                break;
            default:
                return res.status(400).json({ error: "Invalid type parameter" });
        }
        res.json(aluno || { message: "Aluno not found" });
    } catch (error) {
        console.error("Error fetching aluno:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});



export default router;