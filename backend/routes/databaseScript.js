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
  getNAlunos
} from './functions.js'
import express from 'express';
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Alunos
router.get('/aluno', async (req, res) => {
  try {
    const aluno = await getAlunos();
    res.json(aluno || { message: 'No Aluno' });
  } catch (error) {
    console.error('error getting aluno:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});

// Responsáveis
router.get('/responsavel', async (req, res) => {
  try {
    const responsavel = await getResponsaveis();
    res.json(responsavel || { message: 'No Responsavel' });
  } catch (error) {
    console.error('error getting responsavel:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});

// Pagamentos
router.get('/pagamento', async (req, res) => {
  try {
    const pagamento = await getPagamentos();
    res.json(pagamento || { message: 'No Pagamento' });
  } catch (error) {
    console.error('error getting pagamento:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});

// Endereços
router.get('/endereco', async (req, res) => {
  try {
    const endereco = await getEnderecos();
    res.json(endereco || { message: 'No Endereco' });
  } catch (error) {
    console.error('error getting endereco:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});

// Turmas
router.get('/turmas', async (req, res) => {
  try {
    const turmas = await getTurmas();
    res.json(turmas || { message: 'No Turmas' });
  } catch (error) {
    console.error('error getting turmas:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});












router.get('/aluno/total',async (req,res) => {
  try {
    const total = await getNAlunos();
    res.json(total || {message:'Nenhum Aluno'})
  } catch (error) {
    console.error(error);
    res.json(500).json({error:"query falha"})
  }
})


router.get('/aluno/inadimplente', async (req, res) => {
  try {
    const inadimplente = await getInadimplente();
    res.json(inadimplente || { message: 'No Inadimplentes' })
  } catch (error) {
    console.error('error getting inadimplentes:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});
router.get('/aluno/adimplente', async (req, res) => {
  try {
    const adimplente = await getAdimplente();
    res.json(adimplente || { message: 'No adimplente' })
  } catch (error) {
    console.error('error getting adimplentes:', error);
    res.status(500).json({ error: 'Query falha' });
  }
});
router.get('/aluno/inadimplente/total', async (req, res) => {
  try {
    const inadimplenteCount = await getInadimplenteNum();
    res.json(inadimplenteCount || {message:'none'});
  } catch (error) {
    console.error(error)
    res.status(500).json({error:'falha query'})
  }
})

router.post('/aluno/check', async (req, res) => {
  const { field, value } = req.body;

  try {
    let aluno;
    // Handle turma search differently
    if (field === 'turma') {
      aluno = await getByField('alunos', 'id_turma', value);
    } else {
      aluno = await getByField('alunos', field, value);
    }
    
    res.json(aluno || { message: "Aluno não encontrado" });
  } catch (error) {
    console.error("Error fetching aluno:", error);
    res.status(500).json({ error: "Falha na busca" });
  }
});

router.post('/funcionario/check', async (req, res) => {
  const { field, value } = req.body;

  try {
    let funcionario
    funcionario = await getByField('funcionarios', field, value);
    res.json(aluno || { message: "funcionario not found" });
  } catch (error) {
    console.error("Error fetching aluno:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.post('/insert', async (req, res) => {
  const { tableName, data } = req.body;
  console.log("Recebendo dados:", req.body)
  try {
    const result = await insertIntoTable(tableName, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'erro na inserção' })
  }

});
export default router;