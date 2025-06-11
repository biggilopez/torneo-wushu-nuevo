import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Combate = {
  id: string;
  nombre: string;
  rojo: Atleta;
  azul: Atleta;
  ganadorId: string | null;
};

type Props = {
  combates: Combate[];
  onSeleccionarGanador: (combateId: string, ganadorId: string) => void;
};

export default function LlaveVisual3({ combates, onSeleccionarGanador }: Props) {
  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg font-semibold text-center">Round Robin (3 atletas)</h2>
      {combates.map((c, idx) => (
        <div key={c.id} className="bg-gray-800 p-4 rounded shadow mb-2 flex flex-col items-center">
          <div className="font-bold mb-1">{c.nombre}</div>
          <div className="mb-2">
            <span>
              Nº {c.rojo.numeroSorteo} {c.rojo.nombre}
              {" "}
              <b style={{ color: c.ganadorId === c.rojo.id ? "#6ee7b7" : undefined }}>
                {c.ganadorId === c.rojo.id ? "🏅" : ""}
              </b>
            </span>
            <span className="mx-2 font-bold">vs</span>
            <span>
              Nº {c.azul.numeroSorteo} {c.azul.nombre}
              {" "}
              <b style={{ color: c.ganadorId === c.azul.id ? "#6ee7b7" : undefined }}>
                {c.ganadorId === c.azul.id ? "🏅" : ""}
              </b>
            </span>
          </div>
          {!c.ganadorId && (
            <div>
              <button
                className="bg-green-700 text-white px-3 py-1 rounded mx-2"
                onClick={() => onSeleccionarGanador(c.id, c.rojo.id)}
              >
                Gana {c.rojo.nombre}
              </button>
              <button
                className="bg-blue-700 text-white px-3 py-1 rounded mx-2"
                onClick={() => onSeleccionarGanador(c.id, c.azul.id)}
              >
                Gana {c.azul.nombre}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}