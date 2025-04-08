import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './components/login'
import Dashboard from './components/dashboard'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
    </Routes>
  </BrowserRouter>
)
