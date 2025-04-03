import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Aluno from './components/aluno.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Aluno />
  </StrictMode>,
)
