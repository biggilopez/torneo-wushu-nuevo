import React from "react";
import { Combate } from "@/hooks/LlaveManager";

type Props = {
  combate: Combate;
  seleccionarGanador: (id: string, ganador: "rojo" | "azul") => void;
  actualizarOrdenCombate: (id: string, orden: string) => void;
};

export default function LlaveInterfaz({ combate, seleccionarGanador, actualizarOrdenCombate }: Props) {
  return (
    <div className="relative mb-6">
     {/* Número de orden */}
      <input
        type="text"
        placeholder="#"
        value={combate.ordenCombate || ""}
        onChange={(e) => actualizarOrdenCombate(combate.id, e.target.value)}
        className="absolute left-1/2 -top-5 transform -translate-x-1/2 bg-yellow-300 text-black text-center rounded-full w-10 h-10 font-bold shadow-md"
      />

      {/* Contenedor horizontal */}
      <div className="flex items-center justify-center gap-4 bg-white text-black p-4 rounded shadow-md">
        {/* Rojo */}
        <button
          className={`flex-1 p-2 rounded-lg border-2 border-red-600 ${
            combate.ganadorId === combate.rojo?.id ? "bg-red-600 text-white font-bold" : "bg-red-100"
          }`}
          onClick={() => seleccionarGanador(combate.id, "rojo")}
        >
          🟥 {combate.rojo?.nombre || "-"}
        </button>
        
         
        {/* VS y ronda */}
        <div className="text-center">
          <div className="text-sm font-bold mb-1">{combate.ronda}</div>
          <div className="text-xl font-black">VS</div>
        </div>

        {/* Azul */}
        <button
          className={`flex-1 p-2 rounded-lg border-2 border-blue-600 ${
            combate.ganadorId === combate.azul?.id ? "bg-blue-600 text-white font-bold" : "bg-blue-100"
          }`}
          onClick={() => seleccionarGanador(combate.id, "azul")}
        >
          🟦 {combate.azul?.nombre || "-"}
        </button>
      </div>
    </div>
  );
}
