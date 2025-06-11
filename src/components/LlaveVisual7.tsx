import React from "react";
type Atleta = { id: string; nombre: string; numeroSorteo: number };

export default function LlaveVisual7({ atletas }: { atletas: Atleta[] }) {
  // Grilla estándar para 7:
  // 1 pasa a semi, cuartos: 2 vs 7, 3 vs 6, 4 vs 5
  const a1 = atletas.find(a => a.numeroSorteo === 1);
  const a2 = atletas.find(a => a.numeroSorteo === 2);
  const a3 = atletas.find(a => a.numeroSorteo === 3);
  const a4 = atletas.find(a => a.numeroSorteo === 4);
  const a5 = atletas.find(a => a.numeroSorteo === 5);
  const a6 = atletas.find(a => a.numeroSorteo === 6);
  const a7 = atletas.find(a => a.numeroSorteo === 7);

  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Llave de 7 atletas</h2>
      <div className="mb-3">
        <div className="font-semibold">Cuartos de final</div>
        <div>2 ({a2?.nombre || "Vacante"}) vs 7 ({a7?.nombre || "Vacante"})</div>
        <div>3 ({a3?.nombre || "Vacante"}) vs 6 ({a6?.nombre || "Vacante"})</div>
        <div>4 ({a4?.nombre || "Vacante"}) vs 5 ({a5?.nombre || "Vacante"})</div>
        <div>1 ({a1?.nombre || "Vacante"}) pasa a semifinal</div>
      </div>
      <div className="font-semibold mt-4">Semifinales y final según ganadores</div>
      <div className="mt-4 text-center text-sm text-gray-400">Los ganadores avanzan según el cuadro oficial.</div>
    </div>
  );
}