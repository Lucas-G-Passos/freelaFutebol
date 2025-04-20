import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateRoute";
import Navbar from "./components/navbar";
import Aluno from "./components/aluno/aluno";
import "./components/css/variables.css";
import FuncionarioCheckForm from "./components/funcionario/funcionarioCheckForm";
import AlunoForm from "./components/aluno/alunoForm";

// In App.js

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route element={<PrivateRoute />}> */}
      <Route element={<Navbar />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/alunoForm" element={<AlunoForm />} />
        <Route path="/funcionario" element={<FuncionarioCheckForm />} />
      </Route>
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
);
