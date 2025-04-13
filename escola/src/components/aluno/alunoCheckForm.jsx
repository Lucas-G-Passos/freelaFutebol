import React, { useState, useEffect } from "react"; // ✔️ Adicionado o import combinado
import axios from "axios"; // (mantido, embora axios não esteja em uso aqui)
import './../css/aluno.css';

export default function AlunoCheckForm() {
    const [searchField, setSearchField] = useState("nome_completo");
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);

    const [turmas, setTurmas] = useState([]); // ✔️ NOVO estado para armazenar turmas

    const handleSearch = async () => {
        if (searchField === 'turma' && !searchValue) {
            return alert("Selecione uma turma");
        }
        if (searchField !== 'turma' && !searchValue) {
            return alert("Digite um valor para busca");
        }

        try {
            const response = await fetch("http://localhost:5000/api/aluno/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    field: searchField,
                    value: searchField === 'turma' ? parseInt(searchValue) : searchValue
                })
            });

            const data = await response.json();
            setResults(Array.isArray(data) ? data : [data]);
            console.table(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // ✔️ Adicionada função para buscar turmas na API
        async function fetchTurmas() {
            try {
                const response = await fetch('http://localhost:5000/api/turmas');
                const data = await response.json(); // ✔️ Corrigido para .json()
                console.log("Turmas carregadas:", data);
                setTurmas(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar turmas:", error);
                setTurmas([]);
            }
        }
        fetchTurmas();
    }, []);

    return (
        <div id="alunoRoot">
            <div id="inputField">
                <div className="input-wrapper">

                    {/* ✔️ TROCA condicional entre input e select */}
                    {searchField === "turma" ? (
                        <select
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="turma-select" // ✔️ Nova classe CSS
                        >
                            <option value="">Selecione uma turma</option>
                            {turmas.map((turma) => (
                                <option key={turma.id} value={turma.id}>
                                    {turma.nome}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            placeholder="Digite o valor"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    )}

                    <div id="filterOptions">
                        <select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            id="search"
                        >
                            <option value="nome_completo">Nome</option>
                            <option value="matricula">N° Matrícula</option>
                            <option value="cpf">CPF</option>
                            <option value="turma">Turma</option> {/* ✔️ Novo filtro */}
                            <option value="pagamento">Situação de Pagamento</option>
                            <option value="rg">RG</option>
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
                            <li key={index}>
                                {aluno.nome_completo} - CPF: {aluno.cpf} - Turma: {aluno.nome_turma}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum aluno encontrado</p>
                )}
            </div>
        </div>
    );
}
