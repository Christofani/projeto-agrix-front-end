import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { initializeAuth } from "./api.ts";

initializeAuth();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
