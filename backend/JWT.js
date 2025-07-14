import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

function verifyJWT(requiredPermissions = []) {
  return (req, res, next) => {
    try {
      if (!process.env.SECRET) {
        throw new Error("Chave secreta não configurada");
      }

      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Formato de token inválido" });
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          console.error("Erro na verificação do token:", err);
          return res.status(401).json({ message: "Token inválido ou expirado" });
        }

        // Verifica se as propriedades básicas existem
        if (!decoded.userId || !decoded.role) {
          return res.status(403).json({ message: "Token inválido: dados incompletos" });
        }

        // Converte a string de permissões em array
        const userPermissions = decoded.role.split(' ');
        
        // Verifica se tem todas as permissões requeridas
        const hasAllPermissions = requiredPermissions.every(perm => 
          userPermissions.includes(perm)
        );

        if (!hasAllPermissions && requiredPermissions.length > 0) {
          return res.status(403).json({ 
            message: `Acesso negado. Permissões necessárias: ${requiredPermissions.join(', ')}`
          });
        }

        // Atribui dados decodificados ao request
        req.userId = decoded.userId;
        req.userPermissions = userPermissions; // Array de permissões
        
        next();
      });
    } catch (error) {
      console.error("Erro no middleware JWT:", error);
      return res.status(500).json({ message: "Erro de autenticação" });
    }
  };
}

export default verifyJWT;