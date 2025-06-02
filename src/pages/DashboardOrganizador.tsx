import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardOrganizador() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Panel del Organizador</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <button
          className="bg-blue-600 hover:bg-blue-700 p-4 rounded shadow"
          onClick={() => navigate("/inscripciones")}
        >
          📋 Ver inscripciones
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 p-4 rounded shadow"
          onClick={() => navigate("/llaves")}
        >
          🧩 Ver llaves
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 p-4 rounded shadow"
          onClick={() => navigate("/resultados")}
        >
          🏆 Ver resultados
        </button>
      </div>
    </div>
  );
}
