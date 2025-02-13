import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FormComponent from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormComponent />
  </StrictMode>,
)
