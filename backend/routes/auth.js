
import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();

const router = express.Router();
const SECRET = process.env.SECRET;


const authLogin = router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, ' ', password)
    try {
        console.log("Username recebido:", username);


        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log("Buscando usuário:", username);
        console.log("Resultado da query:", rows);

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

export default authLogin;
