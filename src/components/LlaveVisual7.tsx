// src/components/LlaveVisual7.tsx
import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletasUbicados: (Atleta | null)[];
};

export default function LlaveVisual7({ atletasUbicados }: Props) {
  const [a1, a7, a6, a5, a4, a3, a2] = atletasUbicados;

  return (
    <div className="text-white space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Llave de 7 atletas</h2>

      {/* Primera ronda (cuartos de final) */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-semibold">1 avanza por BYE a Semifinal 1 (Rojo):</p>
          <div className="bg-green-700 p-2 rounded">
            {a1 ? `${a1.nombre} (#${a1.numeroSorteo})` : "BYE"}
          </div>
        </div>
        <div>
          <p className="font-semibold">5 vs 4:</p>
          <div className="bg-blue-700 p-2 rounded">
            {a5?.nombre || "---"}
          </div>
          <div className="bg-red-700 p-2 rounded">
            {a4?.nombre || "---"}
          </div>
        </div>

        <div>
          <p className="font-semibold">3 vs 6:</p>
          <div className="bg-blue-700 p-2 rounded">
            {a3?.nombre || "---"}
          </div>
          <div className="bg-red-700 p-2 rounded">
            {a6?.nombre || "---"}
          </div>
        </div>
        <div>
          <p className="font-semibold">7 vs 2:</p>
          <div className="bg-blue-700 p-2 rounded">
            {a7?.nombre || "---"}
          </div>
          <div className="bg-red-700 p-2 rounded">
            {a2?.nombre || "---"}
          </div>
        </div>
      </div>

      {/* Semifinales */}
      <div className="mt-8">
        <p className="font-semibold mb-2">Semifinal 1:</p>
        <p className="italic text-gray-400">Rojo: {a1?.nombre || "---"} vs Azul: Ganador(5 vs 4)</p>

        <p className="font-semibold mt-6 mb-2">Semifinal 2:</p>
        <p className="italic text-gray-400">Rojo: Ganador(3 vs 6) vs Azul: Ganador(7 vs 2)</p>
      </div>

      {/* Final */}
      <div className="mt-10">
        <p className="font-bold mb-2">Final:</p>
        <p className="italic text-gray-400">Ganador Semifinal 1 vs Ganador Semifinal 2</p>
      </div>
    </div>
  );
}

