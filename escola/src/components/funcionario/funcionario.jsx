import React, { useEffect, useState } from "react";
import "./css/funcionario.css";
import InputField from "./inputField";
import { getNFuncionarios } from "./apiCalls";
import Results from "./resultado";
import FuncionarioDetailsCard from "./detailCardFunc";

export default function Funcionario() {
  const [NF, setNF] = useState({});
  const [func, setFunc] = useState([]);
  const [searched, setSearched] = useState(0);
  const [detail, setDetail] = useState();

  function getResult(data) {
    setFunc(data);
  }
  function setSearch(s) {
    setSearched(s);
  }
  function setDetailCard(f) {
    setDetail(f);
  }

  useEffect(() => {
    async function getNF() {
      try {
        const data = await getNFuncionarios();
        setNF(data);
      } catch (error) {
        console.error("erro ao buscar N° de funcionários: ", error);
        setNF("");
      }
    }
    getNF();
  }, []);
  return (
    <div className="funcionarioRoot">
      <InputField sendData={getResult} hasSearched={setSearch} />
      <div className="funcionarioCount">
        <p>Número de funcionários: {NF.total}</p>
      </div>
      {searched === 1 ? <Results f={func} card={setDetailCard} /> : null}
      <FuncionarioDetailsCard data={detail} onClose={setDetailCard} />
      {console.log(detail)}
    </div>
  );
}
