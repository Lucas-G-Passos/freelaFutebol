import React, { useEffect, useState } from "react";
import DetailsCard from "./detailCard";
import "./../css/aniversariante.css";

export default function Niver() {
  const [nivers, setNivers] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);

  useEffect(() => {
    async function fetchAniversariantes() {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_BACKENDURL}/api/aluno/aniversariantes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setNivers(data || []);
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    fetchAniversariantes();
  }, []);

  return (
    <div className="rootAniversariantes">
      <h3 className="liTitle">Aniversariantes 🎂</h3>
      <ul>
        {nivers.length > 0 ? (
          nivers.map((aluno) => (
            <li key={aluno.id} onClick={() => setSelectedAluno(aluno)}>
              <img src={aluno.foto} className="fotoAluno" />
              {aluno.aluno_id} - {aluno.nome_completo} - 
              {new Date(aluno.data_nascimento).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </li>
          ))
        ) : (
          <p>Nenhum Aniversariante esse mês</p>
        )}
      </ul>

      <DetailsCard
        className="niver-details-card"
        aluno={selectedAluno}
        onClose={() => setSelectedAluno(null)}
        onUpdate={(updatedAluno) => {
          setNivers((prevResults) =>
            prevResults.map((a) =>
              a.aluno_id === updatedAluno.aluno_id
                ? { ...a, ...updatedAluno }
                : a
            )
          );
          setSelectedAluno((prev) =>
            prev && prev.aluno_id === updatedAluno.aluno_id
              ? { ...prev, ...updatedAluno }
              : prev
          );
        }}
      />
    </div>
  );
}
