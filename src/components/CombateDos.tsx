import React, { useState } from "react";
import { Atleta, Combate } from "@/hooks/LlaveManager";

type Props = {
  atletas: Atleta[];
  onFinalizado?: (ganador: Atleta, perdedor: Atleta) => void; // <--- nueva prop!
};

export default function CombateDos({ atletas, onFinalizado }: Props) {
  const [combate, setCombate] = useState<Combate>({
    id: "final",
    ronda: "Final",
    rojo: atletas[0],
    azul: atletas[1],
    ganadorId: null,
  });

  const seleccionarGanador = (color: "rojo" | "azul") => {
    const ganadorId = color === "rojo" ? combate.rojo?.id : combate.azul?.id;
    setCombate((prev) => {
      const nuevo = { ...prev, ganadorId: ganadorId || null };
      // Llama al callback si existe y si hay ganador
      if (nuevo.ganadorId && onFinalizado) {
        const ganador = color === "rojo" ? nuevo.rojo : nuevo.azul;
        const perdedor = color === "rojo" ? nuevo.azul : nuevo.rojo;
        onFinalizado(ganador, perdedor);
      }
      return nuevo;
    });
  };

  const mostrarPodio = combate.ganadorId !== null;

  const primero = combate.ganadorId;
  const segundo =
    combate.ganadorId === combate.rojo?.id ? combate.azul?.id : combate.rojo?.id;

  const atletasMap = {
    [combate.rojo?.id || ""]: combate.rojo?.nombre || "-",
    [combate.azul?.id || ""]: combate.azul?.nombre || "-",
  };

  return (
    <div className="bg-white text-black p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4 text-center">Final (2 atletas)</h2>

      <div className="flex justify-between items-center gap-4">
        <button
          className={`flex-1 p-3 rounded ${
            combate.ganadorId === combate.rojo?.id
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => seleccionarGanador("rojo")}
        >
          🟥 {combate.rojo?.nombre}
        </button>

        <span className="font-bold">VS</span>

        <button
          className={`flex-1 p-3 rounded ${
            combate.ganadorId === combate.azul?.id
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => seleccionarGanador("azul")}
        >
          🟦 {combate.azul?.nombre}
        </button>
      </div>

      {mostrarPodio && (
        <div className="mt-6 p-4 bg-green-700 text-white rounded">
          <h3 className="text-xl font-bold mb-2">🏆 Resultados Finales</h3>
          <p>🥇 1°: {atletasMap[primero || ""]}</p>
          <p>🥈 2°: {atletasMap[segundo || ""]}</p>
        </div>
      )}
    </div>
  );
}
