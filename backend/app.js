import express from "express";
import cors from "cors";
import router from "./routes/databaseScript.js";
import verifyJWT from "./JWT.js";
import routerLogin from "./routes/functions/auth.js";
import routerPDF from './routes/pdfGeneratorRoute.js'
import { configDotenv } from "dotenv";
configDotenv();


const SECRET = process.env.SECRET;
const app = express();
app.use(cors());
app.use(express.json());


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "8"); // Your frontend origin
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// Example Express middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  console.log("Body:", req.body);
  next();
});

app.use("/api",verifyJWT, router, routerPDF);
app.use("/auth", routerLogin);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
