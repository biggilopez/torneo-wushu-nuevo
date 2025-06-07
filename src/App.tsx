// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardOrganizador from "@/pages/DashboardOrganizador";
import VisualizadorDeLlaves from "@/pages/VisualizadorDeLlaves";
import Inscripciones from "@/pages/Inscripciones";
import Resultados from "@/pages/Resultados";

function App() {
  useEffect(() => {
    // Solo cargar si no está en localStorage
    if (!localStorage.getItem("atletas")) {
      fetch("/inscripciones.json")
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("atletas", JSON.stringify(data));
        })
        .catch(err => {
          console.error("Error cargando inscripciones:", err);
        });
    }
  }, []);

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