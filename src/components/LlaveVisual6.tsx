// src/components/LlaveVisual6.tsx
import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletasUbicados: (Atleta | null)[];
};

export default function LlaveVisual6({ atletasUbicados }: Props) {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-lg font-semibold text-center">🧩 Llave de 6 atletas</h2>

      <div>
        <p className="font-semibold">Cuartos de Final</p>
        <p>{atletasUbicados[4]?.nombre || "BYE"} vs {atletasUbicados[3]?.nombre || "BYE"}</p>
        <p>{atletasUbicados[2]?.nombre || "BYE"} vs {atletasUbicados[5]?.nombre || "BYE"}</p>
      </div>

      <div>
        <p className="font-semibold">Semifinales</p>
        <p>{atletasUbicados[0]?.nombre || "BYE"} (espera en semi) vs GANADOR (5 vs 4)</p>
        <p>{atletasUbicados[1]?.nombre || "BYE"} (espera en semi) vs GANADOR (3 vs 6)</p>
      </div>

      <div>
        <p className="font-semibold">Final</p>
        <p>GANADOR SEMIFINAL 1 vs GANADOR SEMIFINAL 2</p>
      </div>
    </div>
  );
}

