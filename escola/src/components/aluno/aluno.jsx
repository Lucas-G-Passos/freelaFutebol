import React, { useState, useEffect } from "react";
import { buscarAlunos, buscarTurmas } from "./apiCalls";
import DetailsCard from "./detailCard";
import AlunoSearchInput from "./inputField";

import "./../css/aluno.css";

export default function Aluno() {
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchField, setSearchField] = useState("nome_completo");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [turmas, setTurmas] = useState([]);

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
              <option value="matricula">N° Matrícula</option>
              <option value="cpf">CPF</option>
              <option value="turma">Turma</option>
              <option value="pagamento">Situação de Pagamento</option>
              <option value="data_matricula">Data de Matrícula</option>
              <option value="ultimo_pagamento">Último Pagamento</option>
            </select>
          </div>

          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>

      <div id="results">
        <h3>Resultados:</h3>
        {results.length > 0 ? (
          <ul>
            {results.map((aluno, index) => (
              <li key={index} onClick={() => setSelectedAluno(aluno)}>
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
