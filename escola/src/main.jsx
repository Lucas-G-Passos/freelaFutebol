import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/login.jsx'
import App from './components/app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
