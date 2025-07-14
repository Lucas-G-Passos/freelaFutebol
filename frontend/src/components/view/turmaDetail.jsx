// TurmaDetail.jsx
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

export default function TurmaDetail({
  turma,
  visible,
  onClose,
  editMode,
  setEditMode,
}) {
  const diasDaSemanaTodos = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const [formData, setFormData] = useState({
    nome: "",
    codigo_turma: "",
    descricao: "",
    dias_semana: [],
    hora_inicio: "",
    hora_termino: "",
    sala: "",
    id: "",
  });

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!turma || initialized) return;
    setFormData({
      nome: turma.nome || "",
      codigo_turma: turma.codigo_turma || "",
      descricao: turma.descricao || "",
      dias_semana: Array.isArray(turma.dias_semana)
        ? turma.dias_semana
        : turma.dias_semana?.split(",").map((d) => d.trim()) || [],
      hora_inicio: turma.hora_inicio || "",
      hora_termino: turma.hora_termino || "",
      sala: turma.sala || "",
      id: turma.id || "",
    });
    setInitialized(true);
  }, [turma, initialized]);

  useEffect(() => {
    if (!visible) setInitialized(false);
  }, [visible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDiaSemana = (dia) => {
    setFormData((prev) => {
      const jaTem = prev.dias_semana.includes(dia);
      return {
        ...prev,
        dias_semana: jaTem
          ? prev.dias_semana.filter((d) => d !== dia)
          : [...prev.dias_semana, dia],
      };
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/turmas/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            turma: {
              id: formData.id,
              nome: formData.nome,
              codigo_turma: formData.codigo_turma,
              descricao: formData.descricao,
              dias_semana: formData.dias_semana,
              hora_inicio: formData.hora_inicio,
              hora_termino: formData.hora_termino,
              sala: formData.sala,
            },
          }),
        }
      );

      if (response.status === 403) {
        alert(
          "Você não tem permissão para atualizar os dados da turma. Entre em contato com o administrador."
        );
        return;
      }

      if (!response.ok) throw new Error("Erro ao atualizar turma.");
      const result = await response.json();
      console.log(result);
      window.location.reload();
      alert("Turma atualizada com sucesso");
      setEditMode(false);
    } catch (error) {
      alert("Erro ao salvar turma");
      console.error("Erro ao salvar turma:", error);
    }
  };

  if (!turma) return null;

  return (
    <div className={`turmaDetailRoot ${visible ? "visible" : "hidden"}`}>
      <button
        type="button"
        className="turmaDetailClose toSide"
        onClick={() => setEditMode((e) => !e)}
      >
        <EditIcon />
      </button>
      <button className="turmaDetailClose" onClick={onClose}>
        <CloseIcon />
      </button>
      <button
        type="button"
        className="turmaDetailClose toSide"
        style={{ right: "70px" }}
        onClick={handleSave}
      >
        <SaveIcon />
      </button>
      <h2>Detalhes da Turma</h2>

      <div className="turmaDetailItem">
        <label>ID:</label>
        <span>{turma.id}</span>
      </div>

      <div className="turmaDetailItem">
        <label>Nome:</label>
        {editMode ? (
          <input name="nome" value={formData.nome} onChange={handleChange} />
        ) : (
          <span>{formData.nome}</span>
        )}
      </div>

      <div className="turmaDetailItem">
        <label>Código:</label>
        {editMode ? (
          <input
            name="codigo_turma"
            value={formData.codigo_turma}
            onChange={handleChange}
          />
        ) : (
          <span>{formData.codigo_turma}</span>
        )}
      </div>

      <div className="turmaDetailItem">
        <label>Descrição:</label>
        {editMode ? (
          <input
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        ) : (
          <span>{formData.descricao}</span>
        )}
      </div>

      <div className="turmaDetailItem">
        <label>Dias da Semana:</label>
        {editMode ? (
          <div className="diasCheckboxes">
            {diasDaSemanaTodos.map((dia) => (
              <label key={dia}>
                <input
                  type="checkbox"
                  checked={formData.dias_semana.includes(dia)}
                  onChange={() => toggleDiaSemana(dia)}
                />
                {dia}
              </label>
            ))}
          </div>
        ) : (
          <span>{formData.dias_semana.join(", ")}</span>
        )}
      </div>

      <div className="turmaDetailItem">
        <label>Horário:</label>
        {editMode ? (
          <span>
            <input
              type="time"
              name="hora_inicio"
              value={formData.hora_inicio}
              onChange={handleChange}
            />{" "}
            -{" "}
            <input
              type="time"
              name="hora_termino"
              value={formData.hora_termino}
              onChange={handleChange}
            />
          </span>
        ) : (
          <span>
            {formData.hora_inicio} - {formData.hora_termino}
          </span>
        )}
      </div>

      <div className="turmaDetailItem">
        <label>Sala:</label>
        {editMode ? (
          <input name="sala" value={formData.sala} onChange={handleChange} />
        ) : (
          <span>{formData.sala}</span>
        )}
      </div>

      <div className="turmaDetailItem">
        <label>ID Filial:</label>
        <span>{turma.id_filial}</span>
      </div>
    </div>
  );
}
