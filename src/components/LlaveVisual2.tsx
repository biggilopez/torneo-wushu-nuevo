import React from "react";
type Atleta = { id: string; nombre: string; numeroSorteo: number };

export default function LlaveVisual2({ atletas }: { atletas: Atleta[] }) {
  const a1 = atletas.find(a => a.numeroSorteo === 1);
  const a2 = atletas.find(a => a.numeroSorteo === 2);

  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white text-center max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Final directa</h2>
      <div className="font-semibold mb-2">Final:</div>
      <div className="flex justify-center gap-6 mb-4">
        <span>{a1?.nombre || "Vacante"}</span>
        <span className="font-bold">vs</span>
        <span>{a2?.nombre || "Vacante"}</span>
      </div>
    </div>
  );
}