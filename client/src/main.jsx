import React  from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
     <Toaster position="top-right"/>
    </BrowserRouter>
  </React.StrictMode>
)
