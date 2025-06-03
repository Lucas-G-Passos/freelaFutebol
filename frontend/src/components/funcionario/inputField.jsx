import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./css/inputField.css";
import { getFuncionarios, getFiliais } from "./apiCalls.js";

export default function InputField({ sendData, hasSearched }) {
  const [searchField, setSearchField] = useState("nome_completo");
  const [searchValue, setSearchValue] = useState("");
  const [filialSelect, setFilialSelect] = useState("");
  const [filial, setFilial] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const filialData = await getFiliais();
        setFilial(filialData);
      } catch (error) {
        console.error("Não foi possível carregar turmas: ", error);
        alert(error.message);
        setFilial([]);
      }
    }
    getData();
  }, []);
  const handleSearch = async () => {
    if (
      (searchField === "nome_completo" && !searchValue.trim()) ||
      (searchField === "filial" && !filialSelect)
    ) {
      return alert("Por favor preencha o campo de busca.");
    }

    try {
      const data = await getFuncionarios({
        [searchField]:
          searchField === "nome_completo" ? searchValue : filialSelect,
      });
      sendData(data);
      hasSearched(1);
    } catch (error) {
      alert("Erro ao buscar funcionários: " + error.message);
      console.error(error);
    }
  };
  return (
    <div className="searchFieldContainer">
      {searchField === "nome_completo" ? (
        <input
          type="text"
          className="funcionarioInput direita"
          placeholder="Nome"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      ) : (
        <select
          className="selectFuncionario direita"
          value={filialSelect}
          onChange={(e) => setFilialSelect(e.target.value)}
        >
          <option value="">Selecione uma filial</option>
          {filial.map((f) => (
            <option key={f.filial_id} value={f.filial_id}>
              {f.filial_nome}
            </option>
          ))}
        </select>
      )}

      <select
        className="selectFuncionario"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      >
        <option value="nome_completo">Nome</option>
        <option value="filial">Filial</option>
      </select>

      <button
        type="button"
        className="botaoSearchFuncionario"
        onClick={handleSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
