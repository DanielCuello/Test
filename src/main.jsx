import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Asegúrate de que la ruta sea correcta
import './index.css';  // Importa los estilos de Tailwind

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
