import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FuncionarioCheckForm() {
    const [searchField, setSearchField] = useState("nome");
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchValue) return alert("Entre um Valor");

        try {
            const response = await fetch('http://localhost:5000/api/funcionario/check', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field: searchField, value: searchValue })
            });
            const data = await response.json();
            setResults(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error('Erro ao buscar:', error);
        }
    };

    return (
        <div>
            <h1>Buscar Funcionário</h1>

            <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                <option value="cpf">CPF</option>
                <option value="nome">Nome</option>
                <option value="cargo">Cargo</option>
                <option value="situacao">Situação</option>
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
                        {results.map((func, index) => (
                            <li key={index}>
                                {func.nome} - CPF: {func.cpf} - Cargo: {func.cargo}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum funcionário encontrado</p>
                )}
            </div>
        </div>
    );

}