import React, { useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import { getFiliais } from "./apiCalls";
import "./css/formFunc.css";

export default function FuncionarioForm() {
  const [isUploaded, setUploaded] = useState(false);
  const [funcionario, setFuncionario] = useState({
    nome_completo: "",
    data_nascimento: "",
    data_admissao: "",
    telefone1: "",
    telefone2: "",
    foto: "",
    rg: "",
    cpf: "",
    jornada_escala: "",
    situacao: "",
    cargo: "",
  });
  const [endereco, setEndereco] = useState({
    cep: "",
    cidade: "",
    estado: "",
    numero: "",
    rua: "",
  });
  const [filial, setFilial] = useState([]);

  useEffect(() => {
    const f = async () => {
      const data = await getFiliais();
      console.log(data);
      setFilial(data);
    };
    f();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (isUploaded) return;
    try {
      const formData = new FormData();
      formData.append("foto", file);

      if (!file) {
        alert("Selecione um arquivo primeiro!");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Apenas imagens são permitidas!");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/funcionario/insertImage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`Error! status: ${response.status}`);
      const data = await response.json();
      setFuncionario({ ...funcionario, foto: data.fotoUrl });
      setUploaded(true);
    } catch (error) {
      setError("Falha no upload da imagem: " + error.message);
      console.error(error);
    }
  };
  const handleCepChange = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/^(\d{5})(\d{3})$/, "$1-$2");
    setEndereco((prev) => ({ ...prev, cep: value }));
  };

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setEndereco((prev) => ({ ...prev, numero: value }));
  };

  return (
    <div className="funcionarioFormRoot">
      <form className="formRoot" onSubmit={null}>
        <div className="funcionarioSection formSection">
          <h3 className="formHeader">Dados do Funcionário</h3>
          <div className="formColumnContainer">
            <label>
              <div className="label-text-container">
                Nome Completo<span className="required-asterisk">*</span>
              </div>
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Digite o nome completo"
                value={funcionario.nome_completo}
                onChange={(e) =>
                  setFuncionario({
                    ...funcionario,
                    nome_completo: e.target.value,
                  })
                }
              />
            </label>

            <label>
              <div className="label-text-container">
                Data de Nascimento<span className="required-asterisk">*</span>
              </div>
              <input
                type="date"
                required
                max={new Date().toISOString().split("T")[0]}
                value={funcionario.data_nascimento}
                onChange={(e) =>
                  setFuncionario({
                    ...funcionario,
                    data_nascimento: e.target.value,
                  })
                }
              />
            </label>

            <label>
              <div className="label-text-container">
                Data de Admissão<span className="required-asterisk">*</span>
              </div>
              <input
                type="date"
                required
                max={new Date().toISOString().split("T")[0]}
                value={funcionario.data_admissao}
                onChange={(e) =>
                  setFuncionario({
                    ...funcionario,
                    data_admissao: e.target.value,
                  })
                }
              />
            </label>

            <label>
              <div className="label-text-container">
                Data Nascimento<span className="required-asterisk">*</span>
              </div>
              <input
                type="date"
                required
                max={new Date().toISOString().split("T")[0]}
                value={funcionario.data_nascimento}
                onChange={(e) =>
                  setfuncionario({
                    ...funcionario,
                    data_nascimento: e.target.value,
                  })
                }
              />
            </label>

            <label>
              <div className="label-text-container">
                Telefone 1<span className="required-asterisk">*</span>
              </div>
              <input
                type="tel"
                required
                placeholder="(99) 99999-9999"
                value={funcionario.telefone1}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                  v = v.replace(/^(\d{2})(\d+)/, "($1) $2");
                  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
                  setfuncionario({ ...funcionario, telefone1: v });
                }}
              />
            </label>

            <label>
              <div className="label-text-container">Telefone 2</div>
              <input
                type="tel"
                placeholder="(99) 99999-9999"
                value={funcionario.telefone2}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                  v = v.replace(/^(\d{2})(\d+)/, "($1) $2");
                  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
                  setfuncionario({ ...funcionario, telefone2: v });
                }}
              />
            </label>

            <label>
              <div className="label-text-container">
                Foto<span className="required-asterisk">*</span>
              </div>
              <div className="fotoContainer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg"
                />
                <button
                  type="button"
                  onClick={handleUpload}
                  className="uploadButton"
                  disabled={isUploaded}
                >
                  {isUploaded ? <CheckIcon /> : <FileUploadIcon />}
                </button>
              </div>
            </label>
          </div>
          <div className="formColumnContainer">
            <label>
              <div className="label-text-container">
                RG<span className="required-asterisk">*</span>
              </div>
              <input
                type="text"
                required
                placeholder="99.999.999-9"
                value={funcionario.rg}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 9);
                  v = v.replace(/(\d{2})(\d)/, "$1.$2");
                  v = v.replace(/(\d{3})(\d)/, "$1.$2");
                  v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");
                  setFuncionario({ ...funcionario, rg: v });
                }}
              />
            </label>

            <label>
              <div className="label-text-container">
                CPF<span className="required-asterisk">*</span>
              </div>
              <input
                type="text"
                required
                placeholder="000.000.000-00"
                value={funcionario.cpf}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                  v = v.replace(/(\d{3})(\d)/, "$1.$2");
                  v = v.replace(/(\d{3})(\d)/, "$1.$2");
                  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                  setFuncionario({ ...funcionario, cpf: v });
                }}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
