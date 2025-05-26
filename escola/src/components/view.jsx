import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableCard from "./dragCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "./css/view.css";
import ContextMenu from "./contextMenu";

export default function DragView() {
  const [filial, setFilial] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [funcionario, setFuncionario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [positions, setPosition] = useState();
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    id: null,
    type: null,
    data: null,
  });

  async function getData(prop) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/${prop}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!res.ok) throw new Error(`Erro ao buscar dados: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Erro ao buscar ${prop}:`, error);
      return [];
    }
  }
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchData() {
      try {
        const [turmaData, filialData, alunoData, funciData] = await Promise.all(
          [
            getData("turmas"),
            getData("filial"),
            getData("aluno"),
            getData("funcionario"),
          ]
        );

        if (isMounted) {
          setTurmas(turmaData);
          setFilial(filialData);
          setAlunos(alunoData);
          setFuncionario(funciData);
        }

        const positions = {};
        filialData.forEach((f, index) => {
          positions[f.filial_id] = { x: 600 + index * 200, y: 300 };
        });
        setPosition(positions);
      } catch (error) {
        if (isMounted) {
          setError("Failed to load data");
          console.error("Fetch error:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu((prev) => ({ ...prev, show: false }));
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCardClick = (e, id, type, data) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      id,
      type,
      data,
    });
  };

  const snapToGrid = (x, y, gridSize) => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize,
    };
  };
  const handleDragEnd = (id, newPos) => {
    const snap = snapToGrid(newPos.x, newPos.y, 50);
    setPosition((prev) => ({ ...prev, [id]: snap }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <DndContext>
      <div className="dragViewRoot" onContextMenu={null}>
        {filial.map((f) => (
          <DraggableCard
            key={f.filial_id}
            id={f.filial_id}
            name={f.filial_nome}
            icon={<ApartmentIcon />}
            position={positions[f.filial_id] || { x: 0, y: 0 }}
            onClick={null}
            onContextMenu={(e) => handleCardClick(e, f.filial_id, "filial", f)}
            onDragEnd={handleDragEnd}
          >
            {f.filial_nome}
          </DraggableCard>
        ))}
        {contextMenu.show && (
          <ContextMenu
            position={{ x: contextMenu.x, y: contextMenu.y }}
            id={contextMenu.id}
            type={contextMenu.type}
            data={contextMenu.data}
          />
        )}
      </div>
    </DndContext>
  );
}
