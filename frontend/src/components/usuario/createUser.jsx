import React, { useState } from "react";
import "./css/usuario.css";

export default function CreateUsuario() {
  const [usuario, setUsuario] = useState({
    username: "",
    senha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.username || !usuario.senha) {
      alert("Insira Username ou senha!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/usuario/insert`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          alert("Usuário já existe.");
        } else if (response.status === 400) {
          alert("Dados inválidos ou incompletos.");
        } else if (response.status === 401 || response.status === 403) {
          alert("Você não tem permissão para criar usuários.");
        } else {
          alert(
            `Erro inesperado (${response.status}): ${
              data.message || "Erro ao inserir usuário."
            }`
          );
        }
        return;
      }

      alert(`Usuário ${data.username} inserido com sucesso!`);
      setUsuario({ username: "", senha: "" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro de rede ou servidor indisponível.");
    }
  };

  return (
    <div className="usuarioRoot">
      <form
        className="usuarioIformnputContainer"
        onSubmit={handleSubmit}
        autoComplete="new-password"
      >
        <div className="formSection usuario">
          <div>
            <label>Username</label>
            <label>Senha</label>
          </div>

          <div>
            <input
              type="text"
              name="username"
              autoComplete="new-password"
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  username: e.target.value,
                })
              }
            />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  senha: e.target.value,
                })
              }
            />
          </div>
          <button type="submit">Criar novo usuário</button>
        </div>
      </form>
    </div>
  );
}
