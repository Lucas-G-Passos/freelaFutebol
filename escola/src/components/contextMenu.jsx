import React from "react";
import "./css/contextMenu.css";

export default function ContextMenu({
  id,
  position = { x: 0, y: 0 },
  type,
  data,
}) {
  console.log(data)
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
        <div className="contextItem">Filial item</div>
        <div className="contextItem">Filial item</div>
        <div className="contextItem">Filial item</div>
        <div className="contextItem">Filial item</div>
        <div className="contextItem">Filial item</div>
      </div>
    );
  }
}
