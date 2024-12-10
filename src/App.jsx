import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientScreen from "./ClientScreen";
import AdminScreen from "./AdminScreen";
import './index.css';  // Asegúrate de que la ruta sea correcta



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientScreen />} />
        <Route path="/resultados" element={<AdminScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
