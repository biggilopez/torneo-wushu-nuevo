 // src/pages/Inscripciones.tsx
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { obtenerNombreEvento } from "@/utils/evento";

const nombreEvento = obtenerNombreEvento();
<h1 className="text-2xl font-bold text-center mb-6">{nombreEvento} – Inscripciones</h1>

type Atleta = {
  id: string;
  nombre: string;
  genero: string;
  edad: number;
  peso: number;
  categoria: string;
  division: string;
  equipo?: string;
};

export default function Inscripciones() {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [genero, setGenero] = useState("");
  const [categoria, setCategoria] = useState("");
  const [division, setDivision] = useState("");
  const [equipo, setEquipo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/inscripciones.json")
      .then((res) => res.json())
      .then((data) => setAtletas(data))
      .catch((err) => console.error("Error al cargar inscripciones:", err));
  }, []);

  const atletasFiltrados = atletas.filter((a) => {
    return (
      (genero ? a.genero === genero : true) &&
      (categoria ? a.categoria === categoria : true) &&
      (division ? a.division === division : true) &&
      (equipo ? a.equipo?.toLowerCase().includes(equipo.toLowerCase()) : true)
    );
  });

  const exportarExcel = () => {
    const datos = atletasFiltrados.map(({ id, ...rest }) => rest); // omitimos 'id'
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Inscripciones");

    const buffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "inscripciones.xlsx");
  };

  const divisionesDisponibles = Array.from(new Set(atletas.filter(a =>
    (!genero || a.genero === genero) && (!categoria || a.categoria === categoria)
  ).map(a => a.division))).sort();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📋 Lista de Inscripciones</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select value={genero} onChange={(e) => setGenero(e.target.value)} className="text-black p-2 rounded">
          <option value="">Género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="text-black p-2 rounded">
          <option value="">Categoría</option>
          <option value="niños">Niños</option>
          <option value="junior">Junior</option>
          <option value="mayores">Mayores</option>
        </select>
        <select value={division} onChange={(e) => setDivision(e.target.value)} className="text-black p-2 rounded">
          <option value="">División</option>
          {divisionesDisponibles.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <input
          type="text"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          placeholder="Buscar equipo"
          className="text-black p-2 rounded"
        />
        <button onClick={exportarExcel} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          📤 Exportar Excel
        </button>
        <button onClick={() => navigate("/")} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
          ⬅️ Volver al Panel
        </button>
      </div>

      {/* Tabla de inscriptos */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white text-black rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nombre</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Peso</th>
              <th>Categoría</th>
              <th>División</th>
              <th>Equipo</th>
            </tr>
          </thead>
          <tbody>
            {atletasFiltrados.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.nombre}</td>
                <td>{a.genero}</td>
                <td>{a.edad}</td>
                <td>{a.peso}</td>
                <td>{a.categoria}</td>
                <td>{a.division}</td>
                <td>{a.equipo || "-"}</td>
              </tr>
            ))}
            {atletasFiltrados.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">No hay inscriptos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

