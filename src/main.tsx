import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error: any) {
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: monospace; background: #fff0f0; word-break: break-all;"><h3>App Crash Error:</h3><pre>${error?.message || error}</pre></div>`;
}
