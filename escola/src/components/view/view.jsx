import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableCard from "./dragCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "./css/view.css";
import ContextMenu from "./contextMenu";
import FilialDetailCard from "./filialDetailCard";
import FuncionarioDetailsCard from "../funcionario/detailCardFunc";
import DetailsCard from "../aluno/detailCard";
import InsertForm from "./form";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DraggableFolder from "./dragFolder";
import FolderIcon from "@mui/icons-material/Folder";

export default function DragView() {
  const [filial, setFilial] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [funcionario, setFuncionario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [positions, setPosition] = useState();
  const [detailCard, setDetailCard] = useState({
    show: false,
    type: null,
    data: null,
  });
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    id: null,
    type: null,
    data: null,
  });
  const [form, setForm] = useState({
    show: false,
    id: null,
    type: null,
  });
  const [folders, setFolders] = useState([]);
  const [data, setData] = useState();

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
          positions[f.id] = { x: 600 + index * 200, y: 600 };
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

  const handleContext = (e, id, type, data) => {
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

  const handleDetailCard = (e, type, data) => {
    setDetailCard({ show: true, type, data });
  };
  const handleCloseDetailCard = () => {
    setDetailCard({ show: false, type: null, data: null });
  };
  const handleForm = (e, type, id) => {
    setForm({ show: true, type, id });
  };
  const handleCloseForm = () => {
    setForm({ show: false, type: null });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <DndContext>
      <div
        className="dragViewRoot"
        onContextMenu={(e) => handleContext(e, 1, "default", null)}
      >
        {filial.map((f) => (
          <DraggableCard
            key={f.id}
            id={f.id}
            name={f.nome}
            icon={<ApartmentIcon />}
            position={positions[f.id] || { x: 0, y: 0 }}
            onContextMenu={(e) => handleContext(e, f.id, "filial", f)}
            onDragEnd={handleDragEnd}
            onClick={null}
          >
            {f.nome}
          </DraggableCard>
        ))}
        {contextMenu.show && (
          <ContextMenu
            position={{ x: contextMenu.x, y: contextMenu.y }}
            id={contextMenu.id}
            type={contextMenu.type}
            data={contextMenu.data}
            showDetail={(e) =>
              handleDetailCard(e, contextMenu.type, contextMenu.data)
            }
            form={(e) => {
              handleForm(e, contextMenu.type, contextMenu.id);
              console.log(contextMenu.type, contextMenu.id);
            }}
          />
        )}
        {detailCard.show && detailCard.type === "filial" && (
          <FilialDetailCard
            type={detailCard.type}
            data={detailCard.data}
            onClose={handleCloseDetailCard}
          />
        )}
        {detailCard.show && detailCard.type === "funcionario" && (
          <FuncionarioDetailsCard
            data={detailCard.data}
            onClose={handleCloseDetailCard}
          />
        )}
        {detailCard.show && detailCard.type === "aluno" && (
          <DetailsCard data={detailCard.data} />
        )}
        {form.show && (
          <InsertForm
            onClose={handleCloseForm}
            type={form.type}
            filial={filial.find((f) => f.id === form.id)}
          />
        )}
      </div>
    </DndContext>
  );
}
