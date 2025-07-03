// TurmaCard.jsx
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import "./css/turmaCard.css";
import TurmaDetail from "./turmaDetail";
import DeleteCard from "./deleteCardTurma";

export default function TurmaCard({ turmas, rerun, onClose }) {
  const [deleteCard, setDeleteCard] = useState({ turma: null, show: false });
  const [detail, setDetail] = useState({ turma: null, show: false });
  const [editMode, setEditMode] = useState(false);

  const handleOpenDetail = (turma) => {
    setDetail({ turma, show: true });
    setEditMode(false);
  };

  const handleCloseDetail = () => {
    setDetail({ turma: null, show: false });
    setEditMode(false);
  };

  function Cards({ turma }) {
    return (
      <div className="turmaCard" onClick={() => handleOpenDetail(turma)}>
        <div><strong>ID:</strong> {turma.id}</div>
        <div><strong>Código da Turma:</strong> {turma.codigo_turma}</div>
        <div><strong>Nome:</strong> {turma.nome}</div>
        <div style={{ display: "flex" }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteCard({ turma: turma, show: true });
            }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="turmaCardOverlay">
      <button type="button" className="closeButton" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="turmasCardRoot">
        <div className="turmasCardContainer">
          {turmas.map((t) => (
            <Cards turma={t} key={t.id} />
          ))}
        </div>
      </div>
      {deleteCard.show && (
        <DeleteCard
          turma={deleteCard.turma}
          setDeleteCard={setDeleteCard}
          rerun={rerun}
        />
      )}
      <TurmaDetail
        turma={detail.turma}
        visible={detail.show}
        onClose={handleCloseDetail}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}
