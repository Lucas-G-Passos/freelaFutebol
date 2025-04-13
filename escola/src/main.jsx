import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/dashboard'
import PrivateRoute from './components/privateRoute'
import Navbar from './components/navbar'
import AlunoCheckForm from './components/aluno/alunoCheckForm'
import './components/css/variables.css'
import FuncionarioCheckForm from './components/funcionario/funcionarioCheckForm'


// In App.js

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Navbar />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/aluno' element={<AlunoCheckForm />} />
          <Route path='/funcionario' element={<FuncionarioCheckForm />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
