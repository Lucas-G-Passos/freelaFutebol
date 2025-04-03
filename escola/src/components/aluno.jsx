import React from "react";
import './css/aluno.css';
import { useState } from "react";

const Aluno = () => {
    const [searchField, setSearchField] = useState("cpf");
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchValue) return alert("Please enter a value");

        try {
            const response = await fetch("http://localhost:5000/api/alunoCheck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field: searchField, value: searchValue })
            });
            const data = await response.json();
            setResults(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (  // Added missing return statement
        <div>
            <h1>OLAa</h1>
            <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                <option value="cpf">CPF</option>
                <option value="nome_completo">Nome</option>
                <option value="matricula">Matrícula</option>
                <option value="turma">Turma</option>
                <option value="pagamento">Situação de Pagamento</option>
                <option value="rg">RG</option>
                <option value="data_matricula">Data de Matrícula</option>
                <option value="ultimo_pagamento">Último Pagamento</option>
            </select>

            <input
                type="text"
                placeholder="Digite o valor"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            <div>
                <h3>Resultados:</h3>
                {results.length > 0 ? (
                    <ul>
                        {results.map((aluno, index) => (
                            <li key={index}>
                                {aluno.nome} - CPF: {aluno.cpf} - Turma: {aluno.turma_id}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum aluno encontrado</p>
                )}
            </div>
        </div>
    );
};

export default Aluno;