import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import JobOrderInterface from './App.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
