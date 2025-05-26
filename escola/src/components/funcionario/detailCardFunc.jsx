import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import "./css/detailCardFunc.css";

export default function FuncionarioDetailsCard({ data, onClose, onUpdate }) {
  if (!data) return null;

  const [isUploaded, setUploaded] = useState(false);
  const [isEditing, setEditor] = useState(false);
  const [file, setFile] = useState(null);

  const [formattedData, setFormattedData] = useState({
    id: data.id,
    nome_completo: data.nome_completo,
    data_nascimento: data.data_nascimento,
    telefone1: data.telefone1,
    telefone2: data.telefone2,
    cargo: data.cargo,
    rg: data.rg,
    cpf: data.cpf,
    data_admissao: data.data_admissao,
    foto: data.foto,
    cep: data.cep,
    cidade: data.cidade,
    estado: data.estado,
    filial_nome: data.filial_nome,
    jornada_escala: data.jornada_escala,
    numero_rua: data.numero_rua,
    rua: data.rua,
    situacao: data.situacao,
    id_endereco: data.endereco_id,
  });
  const [updatedData, setUpdatedData] = useState({});
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormattedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaskedChange = (e, name, formatter) => {
    const v = formatter(e.target.value);
    setFormattedData((prev) => ({ ...prev, [name]: v }));
  };

  const handleUpload = async () => {
    if (isUploaded) return;
    try {
      if (!file) {
        alert("Selecione um arquivo primeiro!");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Apenas imagens são permitidas!");
        return;
      }

      const formDataUpload = new FormData();
      formDataUpload.append("foto", file);

      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/funcionario/insertImage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataUpload,
        }
      );

      if (!response.ok) throw new Error(`Error! status: ${response.status}`);

      const data = await response.json();
      setFormattedData((prev) => ({ ...prev, foto: data.fotoUrl }));
      setUploaded(true);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Falha no upload da imagem: " + error.message);
    }
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

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/funcionario/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            funcionario: {
              id: formattedData.id,
              nome_completo: formattedData.nome_completo,
              data_nascimento: formattedData.data_nascimento,
              telefone1: formattedData.telefone1,
              telefone2: formattedData.telefone2,
              cargo: formattedData.cargo,
              rg: formattedData.rg,
              cpf: formattedData.cpf,
              data_admissao: formattedData.data_admissao,
              foto: formattedData.foto,
              filial_nome: formattedData.filial_nome,
              jornada_escala: formattedData.jornada_escala,
              situacao: formattedData.situacao,
            },
            endereco: {
              id: formattedData.id_endereco,
              cep: formattedData.cep,
              cidade: formattedData.cidade,
              estado: formattedData.estado,
              rua: formattedData.rua,
              numero: formattedData.numero_rua,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar funcionário.");
      }

      const result = await response.json();
      console.log(result);
      setFormattedData({
        ...result,
        id: data.id,
        id_endereco: data.endereco_id,
      });

      setEditor(!isEditing);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div className="funcionarioOverlay">
      <div className="funcionarioCard">
        <div className="funcionarioCardHeader">
          <h2>{formattedData.nome_completo}</h2>
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
                <button className="saveButton" onClick={handleSave}>
                  <SaveIcon />
                </button>
                <button className="clearButton">
                  <DeleteForeverIcon />
                </button>
              </div>
            )}
            <button onClick={null} className="pdfButton">
              <PictureAsPdfIcon />
            </button>
            <button
              onClick={() => {
                if (isEditing == true) {
                  setFormattedData(data);
                  setEditor(!isEditing);
                }
                setEditor(!isEditing);
              }}
              className="editButton"
            >
              <EditIcon />
            </button>
            <button onClick={() => onClose(null)} className="closeButton">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="funcionarioDetails">
          <div className="detailSection">
            <h3>Foto</h3>
            {isEditing ? (
              <div>
                <div className="fotoContainerDetail">
                  <p>Imagem :</p>
                  <img src={formattedData.foto} />
                </div>
                <div className="inputContainerDetail">
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
              </div>
            ) : (
              <div>
                <img src={formattedData.foto} />
              </div>
            )}
          </div>
          <div className="detailSection">
            <h3>Informações Pessoais</h3>
            <p>
              <strong>CPF: </strong>
              {formattedData.cpf}
            </p>
            <p>
              <strong>RG: </strong>
              {formattedData.rg}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>
              {new Date(formattedData.data_nascimento).toLocaleDateString()}
            </p>
            <p>
              <strong>Data de Admissão: </strong>
              {new Date(formattedData.data_admissao).toLocaleDateString()}
            </p>
            <p>
              <strong>Cargo: </strong>
              {formattedData.cargo}
            </p>
            {isEditing ? (
              <div className="editSection">
                <label>
                  Status:
                  <select
                    name="situacao"
                    value={formattedData.situacao}
                    onChange={handleChange}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </label>
                <label>
                  Jornada/Escala:
                  <input
                    type="text"
                    name="jornada_escala"
                    value={formattedData.jornada_escala}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Jornada/Escala: </strong>
                  {formattedData.jornada_escala}
                </p>
                <p>
                  <strong>Status: </strong>
                  {formattedData.situacao}
                </p>
              </div>
            )}
          </div>
          <div className="detailSection">
            <h3>Contato</h3>
            {isEditing ? (
              <div className="editSection">
                <label>Telefone 1:</label>
                <input
                  name="telefone1"
                  value={formattedData.telefone1}
                  maxLength={15}
                  placeholder="(99) 99999-9999"
                  onChange={(e) => handleMaskedChange(e, "telefone1", maskTel)}
                  required
                />
                <label>Telefone 2:</label>
                <input
                  name="telefone2"
                  value={formattedData.telefone2}
                  maxLength={15}
                  placeholder="(99) 99999-9999"
                  onChange={(e) => handleMaskedChange(e, "telefone2", maskTel)}
                  required
                />
              </div>
            ) : (
              <>
                <p>
                  <strong>Telefone 1:</strong> {formattedData.telefone1}
                </p>
                <p>
                  <strong>Telefone 2:</strong>{" "}
                  {formattedData.telefone2 || "N/A"}
                </p>
              </>
            )}
          </div>
          <div className="detailSection">
            <h3>Endereço</h3>
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
                  CEP:
                  <input
                    name="cep"
                    value={formattedData.cep}
                    onChange={(e) => handleMaskedChange(e, "cep", maskCEP)}
                  />
                </label>
                <label>
                  Número:
                  <input
                    name="numero_rua"
                    value={formattedData.numero_rua}
                    required
                    placeholder="Ex: 123"
                    maxLength={6}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ) : (
              <>
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
                  <strong>Número:</strong> {formattedData.numero_rua}
                </p>
                <p>
                  <strong>CEP:</strong> {formattedData.cep}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
