import React, { useState, useEffect } from "react";
import { buscarTurmas /*handleGeneratePDF*/ } from "./apiCalls";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function DetailsCard({ aluno, onClose, onUpdate }) {
  if (!aluno) return null;

  const [isEditing, setEditor] = useState(false);
  const [formData, setFormData] = useState({});
  const [turmas, setTurmas] = useState([]);

  // Função para encontrar o nome da turma pelo ID

  const ESTADOS = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  useEffect(() => {
    if (aluno) {
      setFormData({
        id: aluno.aluno_id ?? aluno.id ?? null,
        endereco_id: aluno.endereco_id ?? null,
        responsavel_id: aluno.responsavel_id ?? null,
        id_turma: aluno.id_turma ?? aluno.turma_id ?? null,
        data_nascimento: aluno.data_nascimento ?? null,
        data_matricula: aluno.data_matricula ?? null,
        nome_responsavel:
          aluno.responsavel_nome ?? aluno.nome_responsavel ?? null,
        nome_completo: aluno.nome_completo ?? "",
        telefone1: aluno.telefone1 ?? "",
        telefone2: aluno.telefone2 ?? "",
        rg: aluno.rg ?? "",
        cpf: aluno.cpf ?? "",
        convenio: aluno.convenio ?? "",
        alergia: aluno.alergia ?? "",
        uso_medicamento: aluno.uso_medicamento ?? "",
        medicamento_horario: aluno.medicamento_horario ?? "",
        atestado_medico: aluno.atestado_medico ?? "N",
        colegio: aluno.colegio ?? "",
        colegio_ano: aluno.colegio_ano ?? "",
        time_coracao: aluno.time_coracao ?? "",
        indicacao: aluno.indicacao ?? "",
        observacao: aluno.observacao ?? "",
        ativo: aluno.ativo ?? "Ativo",
        estado: aluno.estado ?? "",
        cidade: aluno.cidade ?? "",
        rua: aluno.rua ?? "",
        cep: aluno.cep ?? "",
        numero: aluno.numero ?? "", // ✅ NOVO
        grau_parentesco: aluno.grau_parentesco ?? "", // ✅ NOVO
        situacao_pagamento: aluno.situacao_pagamento ?? "Adimplente",
      });
    }
  }, [aluno]);
  console.log(formData);

  useEffect(() => {
    async function fetchData() {
      const turmas = await buscarTurmas();
      setTurmas(turmas);
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/aluno/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aluno: {
            id: formData.id,
            id_turma: formData.id_turma, // Campo adicionado
            nome_completo: formData.nome_completo,
            telefone1: formData.telefone1,
            telefone2: formData.telefone2,
            rg: formData.rg,
            cpf: formData.cpf,
            convenio: formData.convenio,
            alergia: formData.alergia,
            uso_medicamento: formData.uso_medicamento,
            medicamento_horario: formData.medicamento_horario,
            atestado_medico: formData.atestado_medico,
            colegio: formData.colegio,
            colegio_ano: formData.colegio_ano,
            time_coracao: formData.time_coracao,
            indicacao: formData.indicacao,
            observacao: formData.observacao,
            ativo: formData.ativo,
          },
          endereco: {
            id: formData.endereco_id,
            estado: formData.estado,
            cidade: formData.cidade,
            rua: formData.rua,
            cep: formData.cep,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Dados atualizados com sucesso!");
        if (onUpdate) onUpdate(result);
        setEditor(false);
      } else {
        throw new Error("Erro na atualização");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar dados");
    }
  };
  async function handleGeneratePDF() {
    try {
      // Monta payload
      const pdfData = {
        aluno: {
          ...formData,
          data_nascimento: formData.data_nascimento,
          data_matricula: formData.data_matricula,
          id_turma: formData.id_turma,
          nome_responsavel: formData.nome,
        },
        endereco: {
          estado: formData.estado,
          cidade: formData.cidade,
          rua: formData.rua,
          cep: formData.cep,
          numero: formData.numero || "N/A",
        },
        responsavel: {
          nome: formData.nome_responsavel,
          cpf: formData.cpf,
          rg: formData.rg,
          grau_parentesco: formData.grau_parentesco,
        },
      };

      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pdfData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(`${response.status}: ${err.details}`);
      }

      // Recebe PDF como arrayBuffer
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Dispara download
      const link = document.createElement("a");
      link.href = url;
      link.download = `ficha_${formData.nome_completo.replace(/\s/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert(`Erro ao gerar PDF: ${error.message}`);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaskedChange = (e, name, formatter) => {
    const v = formatter(e.target.value);
    setFormData((prev) => ({ ...prev, [name]: v }));
  };

  const maskTel = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/^(\d{2})(\d+)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");

  const maskCEP = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{5})(\d{3})$/, "$1-$2");

  const maskNumero = (v) => v.replace(/\D/g, "").slice(0, 6);
  return (
    <div className="aluno-overlay">
      <div className="aluno-card">
        <div className="alunosCardHeader">
          <h2>{formData.nome_completo ?? ""}</h2>
          <div className="actionButtons">
            {isEditing && (
              <div
                className="action-buttons"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <button onClick={handleSave} className="saveButton">
                  <SaveIcon />
                </button>
                <button
                  className="clearButton"
                  onClick={() => {
                    setFormData({ ...aluno });
                    setEditor(false);
                  }}
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            )}
            <button onClick={handleGeneratePDF} className="pdf-button">
              <PictureAsPdfIcon />
            </button>
            <button
              onClick={() => setEditor(!isEditing)}
              className="edit-button"
            >
              <EditIcon />
            </button>
            <button onClick={onClose} className="close-button">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="aluno-details">
          {/* Personal Information */}
          <div className="detail-section">
            <h3>Informações Pessoais</h3>
            <p>
              <strong>CPF:</strong> {aluno.cpf}
            </p>
            <p>
              <strong>RG:</strong> {aluno.rg}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {new Date(aluno.data_nascimento).toLocaleDateString()}
            </p>
            <p>
              <strong>Data de Matrícula:</strong>{" "}
              {new Date(aluno.data_matricula).toLocaleDateString()}
            </p>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Status:
                  <select
                    name="ativo"
                    value={formData.ativo}
                    onChange={handleChange}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </label>
              </div>
            ) : (
              <p>
                <strong>Status:</strong> {aluno.ativo}
              </p>
            )}
          </div>
          <div className="detail-section">
            <h3>Responsável</h3>

            <>
              <p>
                <strong>Nome:</strong> {aluno.responsavel_nome || "N/A"}
              </p>
              <p>
                <strong>RG:</strong> {aluno.responsavel_rg || "N/A"}
              </p>
              <p>
                <strong>CPF:</strong> {aluno.responsavel_cpf || "N/A"}
              </p>
              <p>
                <strong>Parentesco:</strong> {aluno.grau_parentesco || "N/A"}
              </p>
            </>
          </div>

          {/* Contact Information */}
          <div className="detail-section">
            <h3>Contato</h3>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Telefone 1:
                  <input
                    name="telefone1"
                    value={formData.telefone1}
                    required
                    placeholder="(99) 99999-9999"
                    maxLength={15}
                    onChange={(e) =>
                      handleMaskedChange(e, "telefone1", maskTel)
                    }
                  />
                </label>
                <label>
                  <input
                    name="telefone2"
                    value={formData.telefone2}
                    placeholder="(99) 99999-9999"
                    maxLength={15}
                    onChange={(e) =>
                      handleMaskedChange(e, "telefone2", maskTel)
                    }
                  />
                </label>
              </div>
            ) : (
              <>
                <p>
                  <strong>Telefone 1:</strong> {aluno.telefone1}
                </p>
                <p>
                  <strong>Telefone 2:</strong> {aluno.telefone2 || "N/A"}
                </p>
              </>
            )}
          </div>

          {/*Endereco section*/}
          <div className="detail-section">
            <h3>Endereço</h3>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Estado:
                  <select
                    name="estado"
                    value={formData.estado}
                    required
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {ESTADOS.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}{" "}
                  </select>
                </label>
                <label>
                  Cidade:
                  <input
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Rua:
                  <input
                    name="rua"
                    value={formData.rua}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  CEP:
                  <input
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <input
                    name="numero"
                    value={formData.numero}
                    required
                    placeholder="Ex: 123"
                    maxLength={6}
                    onChange={(e) =>
                      handleMaskedChange(e, "numero", maskNumero)
                    }
                  />
                </label>
              </div>
            ) : (
              <>
                <p>
                  <strong>Estado:</strong> {aluno.estado}
                </p>
                <p>
                  <strong>Cidade:</strong> {aluno.cidade}
                </p>
                <p>
                  <strong>Rua:</strong> {aluno.rua}
                </p>
                <p>
                  <strong>Número:</strong> {aluno.numero}
                </p>
                <p>
                  <strong>CEP:</strong> {aluno.cep}
                </p>
              </>
            )}
          </div>

          {/* School Information */}
          <div className="detail-section">
            <h3>Escolaridade</h3>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Colégio:
                  <input
                    name="colegio"
                    value={formData.colegio}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Ano Escolar:
                  <input
                    name="colegio_ano"
                    value={formData.colegio_ano}
                    onChange={handleChange}
                    type="number"
                  />
                </label>
                <label>
                  Time do Coração:
                  <input
                    name="time_coracao"
                    value={formData.time_coracao}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ) : (
              <>
                <p>
                  <strong>Colégio:</strong> {aluno.colegio}
                </p>
                <p>
                  <strong>Ano Escolar:</strong> {aluno.colegio_ano}º Ano
                </p>
                <p>
                  <strong>Time do Coração:</strong> {aluno.time_coracao}
                </p>
              </>
            )}
          </div>

          {/* Medical Information */}
          <div className="detail-section">
            <h3>Saúde</h3>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Convênio:
                  <input
                    name="convenio"
                    value={formData.convenio}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Alergias:
                  <input
                    name="alergia"
                    value={formData.alergia}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Medicação:
                  <input
                    name="uso_medicamento"
                    value={formData.uso_medicamento}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Horário Medicação:
                  <input
                    name="medicamento_horario"
                    value={formData.medicamento_horario}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Atestado Médico:
                  <select
                    name="atestado_medico"
                    value={formData.atestado_medico}
                    onChange={handleChange}
                  >
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </label>
              </div>
            ) : (
              <>
                <p>
                  <strong>Convênio:</strong> {aluno.convenio || "N/A"}
                </p>
                <p>
                  <strong>Alergias:</strong>{" "}
                  {aluno.alergia || "Nenhuma registrada"}
                </p>
                <p>
                  <strong>Medicação:</strong> {aluno.uso_medicamento || "N/A"}
                </p>
                <p>
                  <strong>Horário Medicação:</strong>{" "}
                  {aluno.medicamento_horario || "N/A"}
                </p>
                <p>
                  <strong>Atestado Médico:</strong>{" "}
                  {aluno.atestado_medico === "S" ? "Sim" : "Não"}
                </p>
              </>
            )}
          </div>

          {/* Additional Information */}
          <div className="detail-section">
            <h3>Outras Informações</h3>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Turma:
                  <select
                    name="id_turma"
                    value={formData.id_turma || ""}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Selecione uma turma
                    </option>
                    {turmas.map((turma) => (
                      <option key={turma.id} value={turma.id}>
                        {turma.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Indicação:
                  <input
                    name="indicacao"
                    value={formData.indicacao}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Observações:
                  <textarea
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleChange}
                  />
                </label>
                {/* <label>
                  Situação Pagamento:
                  <select
                    name="situacao_pagamento"
                    value={formData.situacao_pagamento}
                    onChange={handleChange}
                  >
                    <option value="Adimplente">Adimplente</option>
                    <option value="Inadimplente">Inadimplente</option>
                  </select>
                </label> */}
              </div>
            ) : (
              <>
                <p>
                  <strong>Turma:</strong> {aluno.nome_turma}
                </p>
                <p>
                  <strong>Responsável:</strong> {aluno.nome_responsavel}
                </p>
                <p>
                  <strong>Indicação:</strong> {aluno.indicacao || "N/A"}
                </p>
                <p>
                  <strong>Observações:</strong> {aluno.observacao || "Nenhuma"}
                </p>
                {/* <p
                  className={`status ${aluno.situacao_pagamento?.toLowerCase()}`}
                >
                  <strong>Situação:</strong> {aluno.situacao_pagamento}
                </p> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
