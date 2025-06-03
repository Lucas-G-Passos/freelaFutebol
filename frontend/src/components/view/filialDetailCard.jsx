import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "./css/detailContext.css";

export default function FilialDetailCard({ data, onClose }) {
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
  const [isEditing, setEditor] = useState(false);
  const [formattedData, setFormattedData] = useState({
    id: data.filial_id,
    cidade: data.cidade,
    estado: data.estado,
    id_endereco: data.filial_id_endereco,
    numero: data.numero,
    rua: data.rua,
    cep: data.cep,
    nome: data.filial_nome,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormattedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="detailContextOverlay">
      <div className="detailContextCard">
        <div className="detailContextCardHeader">
          {isEditing ? (
            <div className="editSection">
              <label>
                Nome:
                <input
                  onChange={handleChange}
                  name="nome"
                  value={formattedData.nome}
                  type="text"
                  required
                />
              </label>
            </div>
          ) : (
            <h2>{formattedData.nome}</h2>
          )}
          <div className="actionButtonsContainer">
            {isEditing && (
              <div
                className="actionButtons"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <button className="saveButton" onClick={null}>
                  <SaveIcon />
                </button>
              </div>
            )}
            <button
              onClick={() => {
                if (isEditing) {
                  setFormattedData(data);
                }
                setEditor(!isEditing);
              }}
              className="editButton"
            >
              <EditIcon />
            </button>
            <button onClick={onClose} className="closeButton">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="detailSection">
          <h3>Informações da Filial</h3>
          {isEditing ? (
            <div className="editSection">
              <label>
                Estado:
                <select
                  name="estado"
                  value={formattedData.estado}
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
                  ))}
                </select>
              </label>
              <label>
                Cidade:
                <input
                  name="cidade"
                  value={formattedData.cidade}
                  onChange={handleChange}
                />
              </label>
              <label>
                Rua:
                <input
                  name="rua"
                  value={formattedData.rua}
                  onChange={handleChange}
                />
              </label>
              <label>
                Número:
                <input
                  name="numero"
                  value={formattedData.numero}
                  required
                  placeholder="Ex: 123"
                  maxLength={6}
                  onChange={handleChange}
                />
              </label>
              <label>
                CEP:
                <input
                  name="cep"
                  value={formattedData.cep}
                  onChange={handleChange}
                />
              </label>
            </div>
          ) : (
            <div>
              <p>
                <strong>Estado:</strong> {formattedData.estado}
              </p>
              <p>
                <strong>Cidade:</strong> {formattedData.cidade}
              </p>
              <p>
                <strong>Rua:</strong> {formattedData.rua}
              </p>
              <p>
                <strong>Número:</strong> {formattedData.numero}
              </p>
              <p>
                <strong>CEP:</strong> {formattedData.cep}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
