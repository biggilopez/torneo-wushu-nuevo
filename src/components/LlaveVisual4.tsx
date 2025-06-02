// src/components/LlaveVisual4.tsx
import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletasUbicados: (Atleta | null)[];
};

export default function LlaveVisual4({ atletasUbicados }: Props) {
  if (atletasUbicados.length < 4) {
    return <div className="text-red-500">Faltan atletas para la llave de 4.</div>;
  }

  const [a1, a2, a3, a4] = atletasUbicados;

  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg font-semibold">Llave de 4 atletas</h2>

      <div>
        <p className="font-semibold">Semifinal 1:</p>
        <p>
          Rojo: {a1?.nombre || "BYE"} vs Azul: {a3?.nombre || "BYE"}
        </p>
      </div>

      <div>
        <p className="font-semibold">Semifinal 2:</p>
        <p>
          Rojo: {a2?.nombre || "BYE"} vs Azul: {a4?.nombre || "BYE"}
        </p>
      </div>

      <div>
        <p className="font-semibold mt-4">Final:</p>
        <p>Ganador Semifinal 1 vs Ganador Semifinal 2</p>
      </div>
    </div>
  );
}

