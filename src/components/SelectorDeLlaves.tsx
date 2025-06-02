"use client";

import React, { useEffect, useState } from "react";
import GenerarLlave from "./GenerarLlave";
import inscripciones from "@/data/inscripciones.json";

type Atleta = {
  id: string;
  nombre: string;
  genero: string;
  edad: number;
  peso: number;
  categoria: string;
  division: string;
};

const SelectorDeLlaves = () => {
  const [genero, setGenero] = useState("");
  const [categoria, setCategoria] = useState("");
  const [division, setDivision] = useState("");
  const [llaveKey, setLlaveKey] = useState(0);

  const normalizar = (texto: string) => texto.trim().toLowerCase();

const divisionesDisponibles = inscripciones
  .filter(
    (a) =>
      (!genero || normalizar(a.genero) === normalizar(genero)) &&
      (!categoria || normalizar(a.categoria) === normalizar(categoria))
  )
  .map((a) => a.division);

const divisionesUnicas = Array.from(new Set(divisionesDisponibles));

console.log("Divisiones encontradas:", divisionesUnicas);

const atletasFiltrados = inscripciones.filter(
    (a) =>
      (!genero || normalizar(a.genero) === normalizar(genero)) &&
      (!categoria || normalizar(a.categoria) === normalizar(categoria)) &&
      (!division || normalizar(a.division) === normalizar(division))
  ); 

  const handleSortear = () => {
    setLlaveKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          value={genero}
          onChange={(e) => {
            setGenero(e.target.value);
            setDivision(""); // Reinicia selección de división
          }}
          className="p-2 rounded bg-white text-black"
        >
          <option value="">Seleccionar género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>

        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setDivision(""); // Reinicia selección de división
          }}
          className="p-2 rounded bg-white text-black"
        >
          <option value="">Seleccionar categoría</option>
          <option value="niños">Niños</option>
          <option value="junior">Junior</option>
          <option value="mayores">Mayores</option>
        </select>

        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="p-2 rounded bg-white text-black"
          disabled={!genero || !categoria}
        >
          <option value="">Seleccionar división</option>
          {divisionesUnicas.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {atletasFiltrados.length >= 2 && (
        <div>
          <div className="mt-4 mb-2">
            <button
              onClick={handleSortear}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔄 Regenerar sorteo
            </button>
          </div>

          <GenerarLlave key={llaveKey} atletas={atletasFiltrados} />
        </div>
      )}

      {atletasFiltrados.length > 0 && atletasFiltrados.length < 2 && (
        <p className="text-yellow-400">
          ⚠️ Mínimo 2 atletas necesarios para generar una llave.
        </p>
      )}

      {atletasFiltrados.length === 0 && genero && categoria && division && (
        <p className="text-red-400">❌ No hay atletas en esta división.</p>
      )}
    </div>
  );
};

export default SelectorDeLlaves;
