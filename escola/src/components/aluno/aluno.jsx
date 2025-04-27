import React, { useState, useEffect } from "react";
import { buscarAlunos, buscarTurmas, getNalunos } from "./apiCalls";
import DetailsCard from "./detailCard";
import AlunoSearchInput from "./inputField";
import Niver from "./niver";

import "./../css/aluno.css";

export default function Aluno() {
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchField, setSearchField] = useState("nome_completo");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunosCount, setCount] = useState([]);

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
      const turmas = await buscarTurmas();
      const count = await getNalunos();
      const totalAlunos = count.total || 0;
      setCount(totalAlunos);
      setTurmas(turmas);
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

          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
      <div className="alunoCount">Número de alunos:{alunosCount}</div>
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
                {console.table(aluno)}
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
          setResults((prevResults) =>
            prevResults.map((a) =>
              a.aluno_id === updatedAluno.id ? { ...a, ...updatedAluno } : a
            )
          );
          setSelectedAluno((prev) =>
            prev && prev.aluno_id === updatedAluno.id
              ? { ...prev, ...updatedAluno }
              : prev
          );
        }}
      />
    </div>
  );
}
