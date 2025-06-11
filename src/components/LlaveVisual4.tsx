import React from "react";
type Atleta = { id: string; nombre: string; numeroSorteo: number };

export default function LlaveVisual4({ atletas }: { atletas: Atleta[] }) {
  // Grilla estándar: 1 vs 4, 2 vs 3
  const a1 = atletas.find(a => a.numeroSorteo === 1);
  const a2 = atletas.find(a => a.numeroSorteo === 2);
  const a3 = atletas.find(a => a.numeroSorteo === 3);
  const a4 = atletas.find(a => a.numeroSorteo === 4);

  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Llave de 4 atletas</h2>
      <div className="mb-3">
        <div className="font-semibold">Semifinal 1</div>
        <div>{a1?.nombre || "Vacante"} vs {a4?.nombre || "Vacante"}</div>
      </div>
      <div className="mb-3">
        <div className="font-semibold">Semifinal 2</div>
        <div>{a2?.nombre || "Vacante"} vs {a3?.nombre || "Vacante"}</div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">Los ganadores avanzan a la final.</div>
    </div>
  );
}