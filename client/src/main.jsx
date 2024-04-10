import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ThingsContextProvider } from './context/ThingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThingsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThingsContextProvider>
  </AuthContextProvider>
)
