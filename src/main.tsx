/// <reference types="vite/client" />

// Above comment is to suppress TS error for side-effect import of './style.css'
// Cannot find module or type declarations for side-effect import of './style.css'.ts(2882)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './style.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
