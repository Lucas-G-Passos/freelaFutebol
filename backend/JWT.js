import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

function verifyJWT(req, res, next) {
  try {
    // Verifica se a chave secreta existe
    if (!process.env.SECRET) {
      throw new Error("Chave secreta não configurada");
    }

    const authHeader = req.headers.authorization;

    // Validação do header
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = authHeader.split(" ")[1];

    // Verificação assíncrona com promessas
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.error("Erro na verificação do token:", err);
        return res.status(401).json({ message: "Token inválido ou expirado" });
      }

      // Atribui dados decodificados ao request
      req.userId = decoded.userId;
      req.userRole = decoded.role; // Exemplo de campo adicional
      next();
    });
  } catch (error) {
    console.error("Erro no middleware JWT:", error);
    return res.status(500).json({ message: "Erro de autenticação" });
  }
}

export default verifyJWT;
