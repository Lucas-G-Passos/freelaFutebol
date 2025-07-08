import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";
import Navbar from "./components/navbar";
import Aluno from "./components/aluno/aluno";
import "./components/css/variables.css";
import "./components/css/responsive.css";
import AlunoForm from "./components/aluno/alunoForm";
import Funcionario from "./components/funcionario/funcionario";
import FuncionarioForm from "./components/funcionario/funcionarioForm";
import React from "react";
import DragView from "./components/view/view";
import ImportsExports from "./components/imports/importsExports";
import CreateUsuario from "./components/usuario/createUser";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Navbar />}>
          <Route path="/aluno" element={<Aluno />} />
          <Route path="/aluno/Form" element={<AlunoForm />} />
          <Route path="/funcionario" element={<Funcionario />} />
          <Route path="/funcionario/Form" element={<FuncionarioForm />} />
          <Route path="/view" element={<DragView />} />
          <Route path="/imports" element={<ImportsExports />} />
          <Route path="/usuarios" element={<CreateUsuario />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
