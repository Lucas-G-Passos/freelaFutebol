import express from "express";
import jwt from "jsonwebtoken";
import db from "../../db.js";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import verifyJWT from "../../JWT.js";

dotenv.config();

const routerLogin = express.Router();
const SECRET = process.env.SECRET;


routerLogin.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {


        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const user = rows[0];
        const correctPass = await bcrypt.compare(password, user.password);

        if (!correctPass) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });

        res.json({ token });

    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ message: "Erro no servidor" });
    }
});

routerLogin.get('/verify', verifyJWT, (req, res) => {
    res.status(200).json({ valid: true, userId: req.userId });
  });

export default routerLogin;
