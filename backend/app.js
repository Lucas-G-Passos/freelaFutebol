import express from 'express';
import cors from 'cors';
import router from './databaseScripts/databaseScript.js';

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api',router);




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});