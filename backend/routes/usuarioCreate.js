import bcrypt from "bcrypt";
import express from "express";
import db from "../db.js";

const routerUser = express.Router();
const saltRounds = 10;

routerUser.post("/usuario/insert", async (req, res) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(400).json({ message: "Username e senha são obrigatórios." });
  }

  try {
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Usuário já existe." });
    }

    const hash = await bcrypt.hash(senha, saltRounds);

    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash]
    );

    res.status(201).json({ username, id: result.insertId });
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    res.status(500).json({ message: "Erro interno ao inserir usuário." });
  }
});

export default routerUser;
