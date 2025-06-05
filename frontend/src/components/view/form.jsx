import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./css/form.css";

export default function InsertForm({ type, onClose, filial }) {
  console.log(filial);
  const [endereco, setEndereco] = useState({
    cep: "",
    cidade: "",
    estado: "",
    numero: "",
    rua: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  // TYPE DEFAULT
  if (type === "default") {
    const [filial, setFilial] = useState({
      nome: "",
    });

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

        const filialResponse = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/insert`,
          {
            ...requestOptions,
            body: JSON.stringify({
              tableName: "filial",
              data: { ...filial, id_endereco: enderecoData.data.id },
            }),
          }
        );
        if (!filialResponse.ok) {
          const errorData = await filialResponse.json();
          setError(errorData.message || "Erro ao inserir filial");
        }
        alert("Cadastro realizado com sucesso!");
        setFilial({
          nome: "",
        });
        setEndereco({
          cep: "",
          cidade: "",
          estado: "",
          numero: "",
          rua: "",
        });
      } catch (error) {
        setError(error.message || "Erro ao cadastrar Filial");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="viewFormOverlay">
        <div className="closeContainer">
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="viewFormRoot">
          <div className="scrollableContent">
            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-indicator">Carregando...</div>}
            <form className="formRoot" onSubmit={handleSubmit}>
              <div className="formSection">
                <h3 className="formHeader">Dados da Filial</h3>
                <label>
                  <div className="label-text-container">
                    Nome da Filial<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Digite o nome da Filial"
                    value={filial.nome}
                    onChange={(e) => setFilial({ nome: e.target.value })}
                  />
                </label>
              </div>
              <div className="formSection">
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
                    Rua<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Digite o nome da Rua"
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
                    maxLength={10}
                    placeholder="Número"
                    value={endereco.numero}
                    onChange={handleNumeroChange}
                  />
                </label>

                <label>
                  <div className="label-text-container">
                    Cidade<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Cidade"
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
              </div>
              <div className="formFooter">
                <button type="submit" disabled={loading}>
                  {loading ? "Processando..." : "Cadastrar Filial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (type === "filial") {
    const [turma, setTurma] = useState({
      nome: "",
      descricao: "",
      codigo_turma: "",
      dias_semana: [],
      hora_inicio: "",
      hora_termino: "",
      sala: "",
      id_filial: filial.id,
    });

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
        console.log(turma);
        const data = { ...turma, dias_semana: turma.dias_semana.join(",") };
        const turmaResponse = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/insert`,
          {
            ...requestOptions,
            body: JSON.stringify({
              tableName: "turmas",
              data: { ...data },
            }),
          }
        );

        if (!turmaResponse.ok) {
          const errorData = await turmaResponse.json();
          setError(errorData.message || "Erro ao inserir turma");
        }
        alert("Cadastro realizado com sucesso!");
        setTurma({
          nome: "",
          descricao: "",
          codigo_turma: "",
          dias_semana: [],
          hora_inicio: "",
          hora_termino: "",
          sala: "",
          id_filial: filial.id,
        });
      } catch (error) {
        setError(error.message || "Erro ao cadastrar Filial");
      } finally {
        setLoading(false);
      }
    };
    return (
      <div className="viewFormOverlay">
        <div className="closeContainer">
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="viewFormRoot">
          <div className="scrollableContent">
            {error && (
              <div className="error-message turma">
                <button
                  onClick={() => {
                    setError("");
                  }}
                >
                  <CloseIcon />
                </button>
                {error}
              </div>
            )}
            <form className="formRoot" onSubmit={handleSubmit}>
              <div className="formSection">
                <div className="formHeader" style={{ padding: "0" }}>
                  <h3 className="formHeader">Dados da Turma</h3>
                  <p>Filial:{filial.nome}</p>
                  <button type="submit" disabled={loading}>
                    {loading ? "Processando..." : "Cadastrar Filial"}
                  </button>
                </div>
                <label>
                  <div className="label-text-container">
                    Nome da Turma<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Digite o nome da Turma"
                    value={turma.nome}
                    onChange={(e) =>
                      setTurma({ ...turma, nome: e.target.value })
                    }
                  />
                </label>
                <label>
                  <div className="label-text-container">
                    Código da Turma<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Digite o código da turma"
                    value={turma.codigo_turma}
                    onChange={(e) =>
                      setTurma({ ...turma, codigo_turma: e.target.value })
                    }
                  />
                </label>
                <div className="checkbox-group">
                  <span>
                    Dias da Semana<span className="required-asterisk">*</span>
                  </span>
                  {[
                    "Segunda",
                    "Terça",
                    "Quarta",
                    "Quinta",
                    "Sexta",
                    "Sábado",
                    "Domingo",
                  ].map((day) => (
                    <label key={day} className="checkbox-option">
                      {day}
                      <input
                        type="checkbox"
                        value={day}
                        checked={turma.dias_semana.includes(day)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          setTurma((prev) => ({
                            ...prev,
                            dias_semana: checked
                              ? [...prev.dias_semana, value]
                              : prev.dias_semana.filter((d) => d !== value),
                          }));
                        }}
                      />
                    </label>
                  ))}
                </div>
                <label>
                  <div className="label-text-container">
                    Hora de início<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="time"
                    required
                    value={turma.hora_inicio}
                    onChange={(e) =>
                      setTurma({ ...turma, hora_inicio: e.target.value })
                    }
                  />
                </label>
                <label>
                  <div className="label-text-container">
                    Hora do término<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="time"
                    required
                    value={turma.hora_termino}
                    onChange={(e) =>
                      setTurma({ ...turma, hora_termino: e.target.value })
                    }
                  />
                </label>
                <label>
                  <div className="label-text-container">
                    Sala/Campo<span className="required-asterisk">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Digite a sala ou campo"
                    value={turma.sala}
                    onChange={(e) =>
                      setTurma({ ...turma, sala: e.target.value })
                    }
                  />
                </label>
                <label>
                  <div className="label-text-container">Descrição</div>
                  <input
                    type="text"
                    required
                    maxLength={255}
                    placeholder="Digite a descrição"
                    value={turma.descricao}
                    onChange={(e) =>
                      setTurma({ ...turma, descricao: e.target.value })
                    }
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="viewFormOverlay">
        <div className="closeContainer">
          <button type="button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="viewFormRoot">
          <div className="formSection">
            <h3 className="formHeader">
              Formulário não implementado para o tipo: {type}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
