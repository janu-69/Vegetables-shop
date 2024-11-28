import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter} from "react-router-dom"
createRoot(document.getElementById('root')).render(
  <createBrowserRouter>
     <App />
  </createBrowserRouter>
)
