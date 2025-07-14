// DeleteCard.jsx
import React from "react";

export default function DeleteCard({ turma, setDeleteCard, rerun }) {
  async function deleteTurma(id, nome) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/turmas/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id, nome }),
        }
      );

      if (res.status === 403) {
        alert(
          "Você não tem permissão para acessar este recurso. Por favor, entre em contato com o administrador do sistema."
        );
        return;
      }

      if (!res.ok) throw new Error(`Erro ao deletar turma: ${res.status}`);
      const data = await res.json();
      window.location.reload();
      console.log("Turma deletada:", data);
      rerun();
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
    }
  }

  return (
    <div className="deleteCard">
      <h1>Você tem certeza que quer deletar a turma {turma.nome}?</h1>
      <div style={{ display: "flex", gap: "5px" }}>
        <button
          type="button"
          onClick={() => setDeleteCard({ turma: null, show: false })}
          className="cancel"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            deleteTurma(turma.id, turma.nome);
            setDeleteCard({ turma: null, show: false });
          }}
        >
          DELETAR
        </button>
      </div>
    </div>
  );
}
