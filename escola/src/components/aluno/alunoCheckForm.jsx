import React from "react";
import './css/aluno.css';
import { useState } from "react";


export default function AlunoCheckForm (){
    const [searchField, setSearchField] = useState("nome");
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchValue) return alert("Please enter a value");

        try {
            const response = await fetch("http://localhost:5000/api/aluno/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field: searchField, value: searchValue })
            });
            const data = await response.json();
            console.log(data)
            setResults(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return(
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
                                {aluno.nome_completo} - CPF: {aluno.cpf} - Turma: {aluno.id_turma}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum aluno encontrado</p>
                )}
            </div>



            <br></br><br></br>

            <div>
                <form>
                    <input type="text" required placeholder="nome completo"></input><br></br>
                    <input type="text" required placeholder="colegio"></input><br></br>
                    <input type="radio" required v></input>
                </form>
            </div>
        </div>
    );
};

