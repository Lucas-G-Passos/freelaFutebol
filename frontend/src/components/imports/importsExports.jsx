import React, { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PublishIcon from "@mui/icons-material/Publish";
import "./css/importExport.css";
import Table from "./table";

export default function ImportsExports() {
  const [alunoImport, setAlunoImport] = useState(null);
  const [funcionarioImport, setFuncionarioImport] = useState(null);

  const [isUploadedAluno, setUploadedAluno] = useState(false);
  const [isUploadedFuncionario, setUploadedFuncionario] = useState(false);

  const [message, setMessage] = useState("");

  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);

  async function upload(field) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (field === "aluno" && !alunoImport) {
      setMessage("Adicione o arquivo de alunos primeiro!");
      console.log("Adicione o arquivo de alunos primeiro!");
      return;
    }
    if (field === "funcionario" && !funcionarioImport) {
      setMessage("Adicione o arquivo de funcionários primeiro!");
      console.log("Adicione o arquivo de funcionários primeiro!");
      return;
    }

    if (field === "funcionario") {
      setMessage("Não Implementado");
    } else if (field === "aluno") {
      const formData = new FormData();
      formData.append("file", alunoImport);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/aluno/import`,
          {
            ...requestOptions,
            body: formData,
          }
        );

        if (res.status === 403) {
          alert("Você não tem permissão para acessar este recurso.");
          return;
        }

        const data = await res.json();
        if (!res.ok) setMessage(`Erro no upload, Erro:${data.error}`);
        else {
          setUploadedAluno(true);
          alert("Upload concluído");
        }
      } catch (error) {
        setMessage("Erro ao enviar o arquivo: ", error);
        setShow(true);
        console.error(error);
      }
    }
  }
  const handleFileAluno = (e) => {
    const file = e.target.files[0];
    setAlunoImport(file);
  };
  const handleFileFuncionario = (e) => {
    const file = e.target.files[0];
    setFuncionarioImport(file);
  };

  const handleTableChange = (newValue, rowIndex, section, field) => {
    const updatedData = response.map((entry, index) =>
      index === rowIndex
        ? {
            ...entry,
            [section]: {
              ...entry[section],
              [field]: newValue,
            },
          }
        : entry
    );

    setResponse(updatedData);
  };

  return (
    <div className="importRoot">
      <div className="mainImportContainer">
        <div className="importInputContainer">
          <div className="labelImportInput">
            <label>Importar Alunos</label>
            <label>Importar Funcionários</label>
          </div>
          <div className="importInputInnerContainer">
            <div>
              <input
                type="file"
                accept=".xlsx"
                className="importInput"
                name="aluno"
                onChange={handleFileAluno}
              />
              <button
                type="button"
                className="uploadImport"
                onClick={() => upload("aluno")}
              >
                {isUploadedAluno ? <CheckIcon /> : <FileUploadIcon />}
              </button>
            </div>
            <div>
              <input
                type="file"
                accept=".xlsx"
                className="importInput"
                name="funcionario"
                onChange={handleFileFuncionario}
              />
              <button
                type="button"
                className="uploadImport"
                onClick={() => upload("funcionario")}
              >
                {isUploadedFuncionario ? <CheckIcon /> : <FileUploadIcon />}
              </button>
            </div>
          </div>
        </div>
        {show ? (
          <div>
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setShow(false);
              }}
              className="closeButton import button"
            >
              <CloseIcon />
            </button>
            <div className="error-message import">{message}</div>
          </div>
        ) : (
          <div />
        )}
        {/* {show ? (
          <div className="responseTable">
            <div className="tableButtonsContainer">
              <button type="button" className="tableButton">
                <PublishIcon />
              </button>
              <button
                type="button"
                className="tableButton"
                onClick={() => {
                  setResponse("");
                  setShow(false);
                  setUploadedAluno(false);
                  setUploadedFuncionario(false);
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <Table data={response} handleChange={handleTableChange} />
          </div>
        ) : (
          <div />
        )} */}
      </div>
    </div>
  );
}
