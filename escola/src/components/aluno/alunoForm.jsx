import React, { useState, useEffect } from "react";
import "./../css/alunoForm.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckIcon from "@mui/icons-material/Check";

export default function AlunoForm() {
  const [turmas, setTurmas] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State declarations remain unchanged
  const [aluno, setAluno] = useState({
    nome_completo: "",
    data_nascimento: "",
    data_matricula: "",
    telefone1: "",
    telefone2: "",
    foto: "",
    rg: "",
    cpf: "",
    convenio: "",
    alergia: "",
    uso_medicamento: "",
    medicamento_horario: "",
    atestado_medico: "",
    colegio: "",
    colegio_ano: "",
    time_coracao: "",
    indicacao: "",
    observacao: "",
    id_turma: "",
    ativo: "Ativo",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    cidade: "",
    estado: "",
    numero: "",
    rua: "",
  });

  const [responsavel, setResponsavel] = useState({
    nome: "",
    rg: "",
    cpf: "",
    grau_parentesco: "",
  });

  const [pagamento, setPagamento] = useState({
    data_vencimento: "",
    valor_mensalidade: "",
    valor_uniforme: "",
    tipo: "",
  });

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/turmas`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        setTurmas(data);
      } catch (error) {
        setError("Erro ao buscar turmas: " + error.message);
        console.error(error);
      }
    };
    fetchTurmas();
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
        `${import.meta.env.VITE_BACKENDURL}/api/aluno/insertimage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAluno({ ...aluno, foto: data.fotoUrl });
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
      // 1. Insert Endereço
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
      if (!enderecoResponse.ok) throw new Error("Erro ao inserir endereço");
      const enderecoData = await enderecoResponse.json();

      // 2. Insert Aluno
      const alunoResponse = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/insert`,
        {
          ...requestOptions,
          body: JSON.stringify({
            tableName: "alunos",
            data: { ...aluno, id_endereco: enderecoData.id },
          }),
        }
      );
      if (!alunoResponse.ok) throw new Error("Erro ao inserir aluno");
      const alunoData = await alunoResponse.json();

      // 3. Insert Responsável
      const responsavelResponse = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/insert`,
        {
          ...requestOptions,
          body: JSON.stringify({
            tableName: "responsaveis",
            data: { ...responsavel, id_aluno: alunoData.id },
          }),
        }
      );
      if (!responsavelResponse.ok)
        throw new Error("Erro ao inserir responsável");

      // 4. Insert Pagamento
      const pagamentoResponse = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/insert`,
        {
          ...requestOptions,
          body: JSON.stringify({
            tableName: "pagamentos",
            data: {
              ...pagamento,
              responsavel_id: responsavelResult.id,
              status: "pendente",
              juros: 0.0,
              tipo: pagamento.tipo,
            },
          }),
        }
      );
      if (!pagamentoResponse.ok) throw new Error("Erro ao inserir pagamento");

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      setError(error.message || "Erro ao cadastrar aluno");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="alunoFormRoot">
      <form className="formRoot" onSubmit={handleSubmit}>
        {/* Seção Aluno */}
        <div className="alunoSection formSection">
          <h3 className="formHeader">Dados do Aluno</h3>
          <div className="formColumnContainer">
            <div className="formColumn">
              <label>
                <div className="label-text-container">
                  Nome Completo<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Digite o nome completo"
                  value={aluno.nome_completo}
                  onChange={(e) =>
                    setAluno({ ...aluno, nome_completo: e.target.value })
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
                  value={aluno.data_nascimento}
                  onChange={(e) =>
                    setAluno({ ...aluno, data_nascimento: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">
                  Data Matrícula<span className="required-asterisk">*</span>
                </div>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={aluno.data_matricula}
                  onChange={(e) =>
                    setAluno({ ...aluno, data_matricula: e.target.value })
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
                  value={aluno.telefone1}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                    v = v.replace(/^(\d{2})(\d+)/, "($1) $2");
                    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
                    setAluno({ ...aluno, telefone1: v });
                  }}
                />
              </label>

              <label>
                <div className="label-text-container">Telefone 2</div>
                <input
                  type="tel"
                  placeholder="(99) 99999-9999"
                  value={aluno.telefone2}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                    v = v.replace(/^(\d{2})(\d+)/, "($1) $2");
                    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
                    setAluno({ ...aluno, telefone2: v });
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
                  value={aluno.rg}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 9);
                    v = v.replace(/(\d{2})(\d)/, "$1.$2");
                    v = v.replace(/(\d{3})(\d)/, "$1.$2");
                    v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");
                    setAluno({ ...aluno, rg: v });
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
                  value={aluno.cpf}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                    v = v.replace(/(\d{3})(\d)/, "$1.$2");
                    v = v.replace(/(\d{3})(\d)/, "$1.$2");
                    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                    setAluno({ ...aluno, cpf: v });
                  }}
                />
              </label>

              <label>
                <div className="label-text-container">Atestado Médico</div>
                <select
                  required
                  value={aluno.atestado_medico}
                  onChange={(e) =>
                    setAluno({ ...aluno, atestado_medico: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>
            </div>

            <div className="formColumn">
              <label>
                <div className="label-text-container">Convênio</div>
                <select
                  required
                  value={aluno.convenio}
                  onChange={(e) =>
                    setAluno({ ...aluno, convenio: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>
              <label>
                <div className="label-text-container">Alergia</div>
                <select
                  required
                  value={aluno.alergia}
                  onChange={(e) =>
                    setAluno({ ...aluno, alergia: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>

              <label>
                <div className="label-text-container">Uso de Medicamento</div>
                <select
                  required
                  value={aluno.uso_medicamento}
                  onChange={(e) =>
                    setAluno({ ...aluno, uso_medicamento: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              </label>

              {aluno.uso_medicamento === "S" && (
                <label>
                  <div className="label-text-container">
                    Horário Medicamento
                  </div>
                  <input
                    type="time"
                    value={aluno.medicamento_horario}
                    onChange={(e) =>
                      setAluno({
                        ...aluno,
                        medicamento_horario: e.target.value,
                      })
                    }
                  />
                </label>
              )}

              <label>
                <div className="label-text-container">
                  Colégio<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Nome da instituição"
                  value={aluno.colegio}
                  onChange={(e) =>
                    setAluno({ ...aluno, colegio: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">
                  Ano Escolar<span className="required-asterisk">*</span>
                </div>
                <select
                  required
                  value={aluno.colegio_ano}
                  onChange={(e) =>
                    setAluno({ ...aluno, colegio_ano: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  {[...Array(9).keys()].map((i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}º Ano
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <div className="label-text-container">
                  Time do Coração<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={50}
                  placeholder="Ex: Corinthians"
                  value={aluno.time_coracao}
                  onChange={(e) =>
                    setAluno({ ...aluno, time_coracao: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Indicação</div>
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Quem indicou?"
                  value={aluno.indicacao}
                  onChange={(e) =>
                    setAluno({ ...aluno, indicacao: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Observações</div>
                <textarea
                  maxLength={500}
                  placeholder="Digite observações adicionais"
                  value={aluno.observacao}
                  onChange={(e) =>
                    setAluno({ ...aluno, observacao: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">
                  Turma<span className="required-asterisk">*</span>
                </div>
                <select
                  required
                  value={aluno.id_turma}
                  onChange={(e) =>
                    setAluno({ ...aluno, id_turma: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  {turmas.map((turma) => (
                    <option key={turma.id} value={turma.id}>
                      {turma.codigo_turma} - {turma.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Seção Endereço */}
        <div className="enderecoSection formSection">
          <h3>Endereço</h3>
          <label>
            <div className="label-text-container">
              CEP<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
              pattern="[0-9]{5}-[0-9]{3}"
              title="Formato: 12345-678"
              placeholder="12345-678"
              maxLength={9}
              value={endereco.cep}
              onChange={handleCepChange}
            />
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
            <select required>
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

        {/* Seção Responsável */}
        <div className="responsavelSection formSection">
          <h3>Responsável</h3>
          <label>
            <div className="label-text-container">
              Nome<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
              placeholder="Nome do responsável"
              value={responsavel.nome}
              onChange={(e) =>
                setResponsavel({ ...responsavel, nome: e.target.value })
              }
            />
          </label>
          <label>
            <div className="label-text-container">
              RG<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
              maxLength={12}
              placeholder="99.999.999-9"
              value={responsavel.rg}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, "").slice(0, 9);
                v = v.replace(/(\d{2})(\d)/, "$1.$2");
                v = v.replace(/(\d{3})(\d)/, "$1.$2");
                v = v.replace(/(\d{3})(\d{1})$/, "$1-$2");
                setResponsavel({ ...responsavel, rg: v });
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
              // maxLength={11}
              placeholder="000.000.000-00"
              value={responsavel.cpf}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                v = v.replace(/(\d{3})(\d)/, "$1.$2");
                v = v.replace(/(\d{3})(\d)/, "$1.$2");
                v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                setResponsavel({ ...responsavel, cpf: v });
              }}
            />
          </label>
          <label>
            <div className="label-text-container">
              Parentesco<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
              placeholder="Grau de parentesco"
              value={responsavel.grau_parentesco}
              onChange={(e) =>
                setResponsavel({
                  ...responsavel,
                  grau_parentesco: e.target.value,
                })
              }
            />
          </label>
        </div>

        {/* Seção Pagamento */}
        <div className="pagamentoSection formSection">
          <h3>Pagamento</h3>
          <label>
            <div className="label-text-container">
              Vencimento<span className="required-asterisk">*</span>
            </div>
            <input
              type="date"
              required
              value={pagamento.data_vencimento}
              onChange={(e) =>
                setPagamento({ ...pagamento, data_vencimento: e.target.value })
              }
            />
          </label>

          <label>
            <div className="label-text-container">
              Mensalidade (R$)<span className="required-asterisk">*</span>
            </div>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={pagamento.valor_mensalidade}
              onChange={(e) =>
                setPagamento({
                  ...pagamento,
                  valor_mensalidade: e.target.value,
                })
              }
            />
          </label>

          <label>
            <div className="label-text-container">
              Uniforme (R$)<span className="required-asterisk">*</span>
            </div>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={pagamento.valor_uniforme}
              onChange={(e) =>
                setPagamento({ ...pagamento, valor_uniforme: e.target.value })
              }
            />
          </label>

          <label>
            <div className="label-text-container">
              Tipo<span className="required-asterisk">*</span>
            </div>
            <select
              required
              value={pagamento.tipo}
              onChange={(e) =>
                setPagamento({ ...pagamento, tipo: e.target.value })
              }
            >
              <option value="">Selecione</option>
              <option value="Pix">Pix</option>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </label>
        </div>

        <div className="formFooter">
          <button type="submit">Cadastrar Aluno</button>
        </div>
      </form>
    </div>
  );
}
