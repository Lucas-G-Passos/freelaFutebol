import {
    getByField,
    insertIntoTable
} from './functions.js'
import express from 'express';
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/alunoCheck', async (req, res) => {
    const { field, value } = req.body;

    try {
        let aluno
        aluno = await getByField('alunos', field, value);
        res.json(aluno || { message: "Aluno not found" });
    } catch (error) {
        console.error("Error fetching aluno:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

router.post('/mkpdf', async (req,res) => {
    

})
export default router;