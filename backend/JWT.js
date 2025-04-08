import { configDotenv } from "dotenv";
import jwt from 'jsonwebtoken'

configDotenv();

function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.userId; 
        next();
    });
}

export default verifyJWT;