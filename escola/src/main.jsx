import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateRoute";
import Navbar from "./components/navbar";
import Aluno from "./components/aluno/aluno";
import "./components/css/variables.css";
import './components/css/responsive.css'

import AlunoForm from "./components/aluno/alunoForm";

// In App.js

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route element={<PrivateRoute />}> */}
      <Route element={<Navbar />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/aluno/Form" element={<AlunoForm />} />
      </Route>
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
);
