import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletasUbicados: (Atleta | null)[];
};

export default function LlaveVisual3({ atletasUbicados }: Props) {
  if (atletasUbicados.length < 3) {
    return <div className="text-red-500">Faltan atletas para el round robin de 3.</div>;
  }

  const [a1, a2, a3] = atletasUbicados;

  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg font-semibold">Round Robin (3 atletas)</h2>

      <div>
        <p className="font-semibold">Combate 1:</p>
        <p>{a3?.nombre || "BYE"} vs {a2?.nombre || "BYE"}</p>
      </div>

      <div>
        <p className="font-semibold">Combate 2:</p>
        <p>{a1?.nombre || "BYE"} vs {a3?.nombre || "BYE"}</p>
      </div>

      <div>
        <p className="font-semibold">Combate 3:</p>
        <p>{a1?.nombre || "BYE"} vs {a2?.nombre || "BYE"}</p>
      </div>
    </div>
  );
}

