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
    situacao: "Ativo",
    cargo: "",
    id_filial: "",
  });
  const [endereco, setEndereco] = useState({
    cep: "",
    cidade: "",
    estado: "",
    numero: "",
    rua: "",
  });
  const [filial, setFilial] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const f = async () => {
      const data = await getFiliais();
      console.log(data);
      setFilial(data);
    };
    f();
  }, []);

  const getAddByCep = async (cep) => {
    try {
      const cleanedCEP = cep.replace(/\D/g, "");
      const url = `https://viacep.com.br/ws/${cleanedCEP}/json/?_=${Date.now()}`;

      const response = await fetch(url, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("CEP não encontrado");

      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      setEndereco((prev) => ({
        ...prev,
        rua: data.logradouro || prev.rua,
        cidade: data.localidade || prev.cidade,
        estado: data.uf || prev.estado,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setError(
        "Não foi possível buscar o endereço. Verifique o CEP e tente novamente."
      );
    }
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const enderecoResponse = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/insert`,
        {
          ...requestOptions,
          body: JSON.stringify({
            tableName: "endereco",
            data: { ...endereco, cep: endereco.cep.replace(/-/g, "") },
          }),
        }
      );
      if (!enderecoResponse.ok) {
        const errorData = await enderecoResponse.json();
        setError(errorData.message || "Erro ao inserir endereço");
      }
      const enderecoData = await enderecoResponse.json();

      const funcionarioResponse = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/insert`,
        {
          ...requestOptions,
          body: JSON.stringify({
            tableName: "funcionarios",
            data: { ...funcionario, id_endereco: enderecoData.data.id },
          }),
        }
      );

      if (!funcionarioResponse.ok) {
        const errorData = await funcionarioResponse.json();
        setError(errorData.message || "Erro ao inserir Funcionário");
      }
      const funcionarioData = await funcionarioResponse.json();

      alert("Cadastro Realizado com sucesso!");
      setFuncionario({
        nome_completo: "",
        data_nascimento: "",
        data_admissao: "",
        telefone1: "",
        telefone2: "",
        foto: "",
        rg: "",
        cpf: "",
        jornada_escala: "",
        situacao: "Ativo",
        cargo: "",
        id_filial: "",
      });
      setEndereco({
        cep: "",
        cidade: "",
        estado: "",
        numero: "",
        rua: "",
      });
      setUploaded(false);
    } catch (error) {
      setError(error.message || "Erro ao cadastrar Funcionário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="funcionarioFormRoot">
      <form className="formRoot funcionarioForm" onSubmit={handleSubmit}>
        <div className="funcionarioSection formSection">
          <div className="formColumnContainer">
            <h3 className="formHeader">Dados do Funcionário</h3>
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
                  setFuncionario({ ...funcionario, telefone1: v });
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
                  setFuncionario({ ...funcionario, telefone2: v });
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

            <label>
              <div className="label-text-container">
                Filial<span className="required-asterisk">*</span>
              </div>
              <select
                required
                value={funcionario.id_filial}
                onChange={(e) =>
                  setFuncionario({ ...funcionario, id_filial: e.target.value })
                }
              >
                <option value="">Selecione</option>
                {filial.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="formColumnContainer">
            <h3 className="formHeader">Endereço</h3>
            <label className="cep">
              <div className="label-text-container">
                CEP<span className="required-asterisk">*</span>
              </div>
              <div className="cep-input-container">
                <input
                  type="text"
                  required
                  pattern="[0-9]{5}-[0-9]{3}"
                  title="Formato: 12345-678"
                  placeholder="12345-678"
                  maxLength={9}
                  value={endereco.cep}
                  onChange={handleCepChange}
                  onBlur={(e) => {
                    if (endereco.cep.replace(/\D/g, "").length === 8) {
                      getAddByCep(endereco.cep);
                    }
                  }}
                />
              </div>
            </label>
            <label>
              <div className="label-text-container">
                Cidade<span className="required-asterisk">*</span>
              </div>
              <input
                type="text"
                required
                placeholder="Digite a cidade"
                value={endereco.cidade}
                onChange={(e) =>
                  setEndereco({ ...endereco, cidade: e.target.value })
                }
              />
            </label>
            <label>
              <div className="label-text-container">
                Estado<span className="required-asterisk">*</span>
              </div>
              <select
                required
                value={endereco.estado}
                onChange={(e) =>
                  setEndereco({ ...endereco, estado: e.target.value })
                }
              >
                <option value="">Selecione o estado</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </label>
            <label>
              <div className="label-text-container">
                Rua<span className="required-asterisk">*</span>
              </div>
              <input
                type="text"
                required
                placeholder="Digite o nome da rua"
                value={endereco.rua}
                onChange={(e) =>
                  setEndereco({ ...endereco, rua: e.target.value })
                }
              />
            </label>
            <label>
              <div className="label-text-container">
                Número<span className="required-asterisk">*</span>
              </div>
              <input
                type="text"
                required
                placeholder="Ex: 12b"
                maxLength={6}
                value={endereco.numero}
                onChange={handleNumeroChange}
              />
            </label>
          </div>
        </div>

        <div className="formFooter">
          <button type="submit" disabled={loading}>
            {loading ? "Processando..." : "Cadastrar Funcionário"}
          </button>
        </div>
      </form>
    </div>
  );
}
