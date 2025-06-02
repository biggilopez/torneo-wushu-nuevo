// src/components/LlaveVisual2.tsx
import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletasUbicados: (Atleta | null)[];
};

export default function LlaveVisual2({ atletasUbicados }: Props) {
  if (atletasUbicados.length !== 2) return <div>No hay suficientes atletas.</div>;

  const [a1, a2] = atletasUbicados;

  return (
    <div className="text-white space-y-4 text-lg">
      <h2 className="text-xl font-bold text-center">🥇 Final directa (2 atletas)</h2>
      <div className="flex gap-6 justify-center items-center">
        <div className="bg-red-600 p-3 rounded shadow">
          {a1 ? `${a1.nombre} (#${a1.numeroSorteo})` : "BYE"}
        </div>
        <div className="font-bold">VS</div>
        <div className="bg-blue-600 p-3 rounded shadow">
          {a2 ? `${a2.nombre} (#${a2.numeroSorteo})` : "BYE"}
        </div>
      </div>
    </div>
  );
}
