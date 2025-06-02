import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletasUbicados: (Atleta | null)[];
};

export default function LlaveVisual({ atletasUbicados }: Props) {
  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg font-bold text-center">🧩 Llave de 5 atletas</h2>

      <div>
        <h3 className="font-semibold">Cuartos de Final</h3>
        <p>{atletasUbicados[1]?.nombre || "BYE"}</p>
        <p>{atletasUbicados[2]?.nombre || "BYE"}</p>
      </div>

      <div>
        <h3 className="font-semibold">Semifinales</h3>
        <p>{atletasUbicados[0]?.nombre || "BYE"} (espera en semi)</p>
        <p>vs GANADOR (5 vs 4)</p>
        <p>{atletasUbicados[3]?.nombre || "BYE"}</p>
        <p>{atletasUbicados[4]?.nombre || "BYE"}</p>
      </div>

      <div>
        <h3 className="font-semibold">Final</h3>
        <p>GANADOR SEMIFINAL 1</p>
        <p>vs</p>
        <p>GANADOR SEMIFINAL 2</p>
      </div>
    </div>
  );
}

