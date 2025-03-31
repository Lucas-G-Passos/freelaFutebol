import express from 'express';
import cors from 'cors';
const app = express();
const router = express.Router()
app.use(express.json());
app.use(cors());
/*app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});*/






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});