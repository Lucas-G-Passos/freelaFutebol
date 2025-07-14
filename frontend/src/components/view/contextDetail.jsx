import React, { useState } from "react";
import "./css/detailContext.css";

export default function DetailContext({ data, type }) {
  const [titulo, setTitulo] = useState();
  console.log(data);
  console.log(type)

  return (
    <div className="detailContextOverlay">
      <div className="detailContextCard">
        <div className="detailContextCardHeader">
          <h2>Titulo</h2>
        </div>
      </div>
    </div>
  );
}
