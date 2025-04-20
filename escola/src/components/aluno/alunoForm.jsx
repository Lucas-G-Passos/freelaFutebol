import React, { useState, useEffect } from "react";
import "./../css/alunoForm.css";

export default function AlunoForm() {
  const [turmas, setTurmas] = useState([]);
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
  });

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await fetch("http://192.168.1.171:5000/api/turmas");
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        setTurmas(data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        setTurmas([]);
      }
    };
    fetchTurmas();
  }, []);

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
    try {
      // 1. Insira o endereço
      const enderecoResponse = await fetch(
        "http://192.168.1.171:5000/api/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: "endereco",
            data: { ...endereco, cep: endereco.cep.replace(/-/g, "") },
          }),
        }
      );
      if (!enderecoResponse.ok) throw new Error("Erro ao inserir endereço");
      const enderecoData = await enderecoResponse.json();

      // Validação crítica: Verifique se o ID foi retornado
      if (!enderecoData.id)
        throw new Error("ID do endereço não encontrado na resposta");

      // 2. Insira o aluno (COM id_endereco)
      const alunoData = {
        ...aluno,
        id_endereco: enderecoData.id, // ✅ Garanta que este campo está presente
      };

      // Log para depuração
      console.log("Dados do aluno a serem enviados:", alunoData);

      const alunoResponse = await fetch(
        "http://192.168.1.171:5000/api/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: "alunos",
            data: alunoData,
          }),
        }
      );
      if (!alunoResponse.ok) throw new Error("Erro ao inserir aluno");
      const alunoResult = await alunoResponse.json();

      // 3. Insere Responsável
      const responsavelResponse = await fetch(
        "http://192.168.1.171:5000/api/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: "responsaveis",
            data: { ...responsavel, id_aluno: alunoResult.id },
          }),
        }
      );
      if (!responsavelResponse.ok)
        throw new Error("Erro ao inserir responsável");
      const responsavelResult = await responsavelResponse.json();

      // 4. Insere Pagamento
      const pagamentoResponse = await fetch(
        "http://192.168.1.171:5000/api/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: "pagamentos",
            data: {
              ...pagamento,
              responsavel_id: responsavelResult.id,
              status: "pendente",
              juros: 0.0,
            },
          }),
        }
      );
      if (!pagamentoResponse.ok) throw new Error("Erro ao inserir pagamento");

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(error.message || "Erro ao cadastrar aluno");
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
                  type="text"
                  required
                  value={aluno.telefone1}
                  onChange={(e) =>
                    setAluno({ ...aluno, telefone1: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Telefone 2</div>
                <input
                  type="text"
                  value={aluno.telefone2}
                  onChange={(e) =>
                    setAluno({ ...aluno, telefone2: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">
                  Foto<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
                  value={aluno.foto}
                  onChange={(e) => setAluno({ ...aluno, foto: e.target.value })}
                />
              </label>

              <label>
                <div className="label-text-container">
                  RG<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
                  value={aluno.rg}
                  onChange={(e) => setAluno({ ...aluno, rg: e.target.value })}
                />
              </label>

              <label>
                <div className="label-text-container">
                  CPF<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
                  value={aluno.cpf}
                  onChange={(e) => setAluno({ ...aluno, cpf: e.target.value })}
                />
              </label>

              <label>
                <div className="label-text-container">Atestado Médico</div>
                <select
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

              <label>
                <div className="label-text-container">Status</div>
                <select
                  value={aluno.ativo}
                  onChange={(e) =>
                    setAluno({ ...aluno, ativo: e.target.value })
                  }
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </label>
            </div>

            <div className="formColumn">
              <label>
                <div className="label-text-container">Convênio</div>
                <input
                  type="text"
                  value={aluno.convenio}
                  onChange={(e) =>
                    setAluno({ ...aluno, convenio: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Alergia</div>
                <input
                  type="text"
                  value={aluno.alergia}
                  onChange={(e) =>
                    setAluno({ ...aluno, alergia: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Uso de Medicamento</div>
                <input
                  type="text"
                  value={aluno.uso_medicamento}
                  onChange={(e) =>
                    setAluno({ ...aluno, uso_medicamento: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Horário Medicamento</div>
                <input
                  type="time"
                  value={aluno.medicamento_horario}
                  onChange={(e) =>
                    setAluno({ ...aluno, medicamento_horario: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">
                  Colégio<span className="required-asterisk">*</span>
                </div>
                <input
                  type="text"
                  required
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
                  value={aluno.indicacao}
                  onChange={(e) =>
                    setAluno({ ...aluno, indicacao: e.target.value })
                  }
                />
              </label>

              <label>
                <div className="label-text-container">Observações</div>
                <textarea
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
              value={endereco.cep}
              onChange={handleCepChange}
              placeholder="XXXXX-XXX"
              maxLength="9"
            />
          </label>

          <label>
            <div className="label-text-container">
              Cidade<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
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
              <option value="">Selecione</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              {/* Todos os estados brasileiros */}
            </select>
          </label>

          <label>
            <div className="label-text-container">
              Rua<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
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
              value={endereco.numero}
              onChange={handleNumeroChange}
              placeholder="Apenas números"
              maxLength="6"
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
              value={responsavel.rg}
              onChange={(e) =>
                setResponsavel({ ...responsavel, rg: e.target.value })
              }
            />
          </label>

          <label>
            <div className="label-text-container">
              CPF<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
              value={responsavel.cpf}
              onChange={(e) =>
                setResponsavel({ ...responsavel, cpf: e.target.value })
              }
            />
          </label>

          <label>
            <div className="label-text-container">
              Parentesco<span className="required-asterisk">*</span>
            </div>
            <input
              type="text"
              required
              value={responsavel.grau_parentesco}
              onChange={(e) =>
                setResponsavel({ ...responsavel, grau_parentesco: e.target.value })
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
              value={pagamento.valor_mensalidade}
              onChange={(e) =>
                setPagamento({ ...pagamento, valor_mensalidade: e.target.value })
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
              value={pagamento.valor_uniforme}
              onChange={(e) =>
                setPagamento({ ...pagamento, valor_uniforme: e.target.value })
              }
            />
          </label>
        </div>

        <div className="formFooter">
          <button type="submit">Cadastrar Aluno</button>
        </div>
      </form>
    </div>
  );
}
