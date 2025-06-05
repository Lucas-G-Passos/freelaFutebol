import "./css/navbar.css";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import GridViewIcon from "@mui/icons-material/GridView";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div id="navbar">
        <div id="top-button-cont">
          <img src="/tigre.png" className="logo" />
          <NavLink to={"/aluno"} className="navlink">
            <div className="navbutton">
              <PeopleIcon />
              Consultar Aluno
            </div>
          </NavLink>
          <NavLink to={"/funcionario"} className="navlink">
            <div className="navbutton">
              <PeopleIcon />
              Consultar Func.
            </div>
          </NavLink>
          <NavLink to={"/aluno/form"} className="navlink">
            <div className="navbutton">
              <CreateIcon />
              Cadastrar Aluno
            </div>
          </NavLink>
          <NavLink to={"/funcionario/form"} className="navlink">
            <div className="navbutton">
              <CreateIcon />
              Cadastrar Func.
            </div>
          </NavLink>
          <NavLink to={"/view"} className="navlink">
            <div className="navbutton">
              <GridViewIcon />
              View
            </div>
          </NavLink>
          <a
            id="logout-mobile"
            className="navlink"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <div className="navbutton">
              <LogoutIcon />
              Logout
            </div>
          </a>
        </div>
      </div>
      <div style={{ flexGrow: 1, backgroundColor: "var(--surface-a0)" }}>
        <Outlet />
      </div>
    </div>
  );
}
