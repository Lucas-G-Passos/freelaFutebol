import express from 'express';
import cors from 'cors';
import router from './routes/databaseScript.js';
import verifyJWT from './JWT.js';
import routerLogin from './routes/auth.js'
import { configDotenv } from 'dotenv';
configDotenv()

const SECRET = process.env.SECRET;
const app = express();
app.use(express.json());
app.use(cors());


app.use('/api',verifyJWT,router);
app.use('/auth', routerLogin);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});