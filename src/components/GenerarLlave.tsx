import React, { useState } from "react";
import LlaveVisual2 from "./LlaveVisual2";
import LlaveVisual3 from "./LlaveVisual3";
import LlaveVisual4 from "./LlaveVisual4";
import LlaveVisual5 from "./LlaveVisual5";
import LlaveVisual6 from "./LlaveVisual6";
import LlaveVisual7 from "./LlaveVisual7";
import LlaveVisual8 from "./LlaveVisual8";
import ResultadosFinales from "./ResultadosFinales";

type Atleta = {
  id: string;
  nombre: string;
};

const POSICIONES_FIJAS: Record<number, number[]> = {
  2: [1, 2],
  3: [1, 3, 2],
  4: [1, 4, 3, 2],
  5: [1, 5, 4, 3, 2],
  6: [1, 6, 5, 4, 3, 2],
  7: [1, 7, 6, 5, 4, 3, 2],
  8: [1, 8, 5, 4, 3, 6, 7, 2],
};

function sortearAtletas(atletas: Atleta[]) {
  const mezclados = [...atletas].sort(() => Math.random() - 0.5);
  return mezclados.map((atleta, i) => ({
    ...atleta,
    numeroSorteo: i + 1,
  }));
}

export default function GenerarLlave({ atletas }: { atletas: Atleta[] }) {
  const [sorteados, setSorteados] = useState<(Atleta & { numeroSorteo: number })[] | null>(null);

  const cantidad = atletas.length;
  const posiciones = POSICIONES_FIJAS[cantidad];

  const ejecutarSorteo = () => {
    const resultado = sortearAtletas(atletas);
    setSorteados(resultado);
  };

  const ubicados = posiciones
    ? Array(posiciones.length).fill(null).map((_, i) =>
        sorteados?.find((a) => a.numeroSorteo === posiciones[i]) || null
      )
    : [];

  return (
    <div className="space-y-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={ejecutarSorteo}
      >
        Realizar sorteo
      </button>

      {!posiciones && <div className="text-red-500">No hay esquema para {cantidad} atletas.</div>}

      {sorteados && (
        <>
          <h2 className="text-xl font-bold text-center">Llave tipo cajón</h2>
          {cantidad === 2 && <LlaveVisual2 atletasUbicados={ubicados} />}
          {cantidad === 3 && <LlaveVisual3 atletasUbicados={ubicados} />}
          {cantidad === 4 && <LlaveVisual4 atletasUbicados={ubicados} />}
          {cantidad === 5 && <LlaveVisual5 atletasUbicados={ubicados} />}
          {cantidad === 6 && <LlaveVisual6 atletasUbicados={ubicados} />}
          {cantidad === 7 && <LlaveVisual7 atletasUbicados={ubicados} />}
          {cantidad === 8 && <LlaveVisual8 atletasUbicados={ubicados} />}
          {cantidad >= 2 && cantidad <= 8 && <ResultadosFinales atletasUbicados={ubicados} />}

        </>
      )}
    </div>
  );
}
