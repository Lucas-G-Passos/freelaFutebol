import React, { useState, useEffect } from "react";
import { buscarAlunos, buscarTurmas, getNalunos } from "./apiCalls";
import DetailsCard from "./detailCard";
import AlunoSearchInput from "./inputField";
import Niver from "./niver";
import SearchIcon from "@mui/icons-material/Search";
import "./../css/aluno.css";

export default function Aluno() {
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchField, setSearchField] = useState("nome_completo");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunosCount, setCount] = useState(0);

  const handleSearch = async () => {
    if (!searchValue && searchField !== "pagamento") {
      return alert("Digite um valor para busca");
    }
    try {
      const data = await buscarAlunos(searchField, searchValue);
      setResults(data);
    } catch (error) {
      alert("Erro ao buscar alunos: " + error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [turmasData, countData] = await Promise.all([
          buscarTurmas(),
          getNalunos(),
        ]);
        setTurmas(turmasData);
        setCount(countData.total || 0);
      } catch (error) {
        console.error("Failed to load initial data:", error);
        alert(error.message);
        setCount(0);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="alunoRoot">
      <div id="inputField">
        <div className="input-wrapper">
          <AlunoSearchInput
            searchField={searchField}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            turmas={turmas}
          />

          <div id="filterOptions">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              id="search"
            >
              <option value="nome_completo">Nome</option>
              <option value="turma">Turma</option>
              <option value="data_matricula">Data de Matrícula</option>
            </select>
          </div>

          <button onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="alunoCount">Número de alunos: {alunosCount}</div>
      <div
        style={{
          gridColumn: "2 / 8",
          gridRow: "4",
          zIndex: 1,
        }}
      >
        <Niver />
      </div>
      <div id="results">
        <h3>Resultados da Pesquisa:</h3>
        {results.length > 0 ? (
          <ul>
            {results.map((aluno) => (
              <li key={aluno.aluno_id} onClick={() => setSelectedAluno(aluno)}>
                <img src={aluno.foto} className="fotoAluno" />
                {aluno.aluno_id} - {aluno.nome_completo} - Turma:{" "}
                {aluno.nome_turma}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum aluno encontrado</p>
        )}
      </div>

      <DetailsCard
        aluno={selectedAluno}
        onClose={() => setSelectedAluno(null)}
        onUpdate={(updatedAluno) => {
          // Usa o campo correto de ID
          const updatedId = updatedAluno.aluno_id ?? updatedAluno.id;

          // Atualiza lista de resultados
          setResults((prev) =>
            prev.map((a) =>
              a.aluno_id === updatedId
                ? { ...a, ...updatedAluno, aluno_id: updatedId }
                : a
            )
          );

          // Atualiza detail card
          setSelectedAluno((prev) =>
            prev && prev.aluno_id === updatedId
              ? { ...prev, ...updatedAluno, aluno_id: updatedId }
              : prev
          );
        }}
      />
    </div>
  );
}
