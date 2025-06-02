import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DehazeIcon from "@mui/icons-material/Dehaze";
import "./css/contextMenu.css";

export default function ContextMenu({
  id,
  position = { x: 0, y: 0 },
  type,
  data,
  showDetail,
  form,
}) {
  if (type === "filial") {
    return (
      <div
        className="contextMenu"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="contextItem" onClick={form}>
          <AddIcon />
          Adicionar Turma
        </div>
        <NavLink to={"/funcionario/form"} style={{ textDecoration: "none" }}>
          <div className="contextItem">
            <AddIcon />
            Adicionar Funcionário
          </div>
        </NavLink>
        <div className="contextItem" onClick={showDetail}>
          <DehazeIcon />
          Mostrar detalhes da Filial
        </div>
      </div>
    );
  } else if (type === "default") {
    return (
      <div
        className="contextMenu"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="contextItem" onClick={form}>
          <AddIcon />
          Adicionar Filial
        </div>
      </div>
    );
  }
}
