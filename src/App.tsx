// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardOrganizador from "@/pages/DashboardOrganizador";
import VisualizadorDeLlaves from "@/pages/VisualizadorDeLlaves";
import Inscripciones from "@/pages/Inscripciones"; // Temporal vacío
import Resultados from "@/pages/Resultados"; // Temporal vacío

function App() {
  return (
            <Routes>
          <Route path="/" element={<DashboardOrganizador />} />
          <Route path="/llaves" element={<VisualizadorDeLlaves />} />
          <Route path="/inscripciones" element={<Inscripciones />} />
          <Route path="/resultados" element={<Resultados />} />
        </Routes>
      );
}

export default App;
