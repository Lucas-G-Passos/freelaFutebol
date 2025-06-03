import React from "react";
import "./css/results.css";

export default function Results({ f, card }) {
  return (
    <div className="resultsContainer">
      <h3 className="resultsHeader">Resultados da pesquisa:</h3>
      {f.length > 0 ? (
        <ul className="resultsList">
          {f.map((funcionario) => (
            <li
              className="resultItem"
              key={funcionario.id}
              onClick={() => card(funcionario)}
            >
              <img
                src={funcionario.foto}
                alt={funcionario.nome}
                className="fotoFuncionario"
              />
              {funcionario.nome_completo} - Filial: {funcionario.filial_nome}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum funcionário encontrado</p>
      )}
    </div>
  );
}
