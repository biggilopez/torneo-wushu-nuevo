"use client";
import { useEffect } from "react";
import { useLlaveManager } from "@/hooks/LlaveManager";
import LlaveInterfaz from "@/components/LlaveInterfaz";

const demoAtletas = [
  { id: "a1", nombre: "Juan Pérez" },
  { id: "a2", nombre: "Carlos Díaz" },
  //{ id: "a3", nombre: "Luis Gómez" },
  //{ id: "a4", nombre: "Pedro Sánchez" },
];

export default function LlaveManualPage() {
  const {
    combates,
    inicializarLlave4,
    seleccionarGanador,
    calcularPodio,
  } = useLlaveManager(demoAtletas);

  useEffect(() => {
    inicializarLlave4();
  }, []);

  const podio = calcularPodio();
  const atletasMap = Object.fromEntries(demoAtletas.map((a) => [a.id, a.nombre]));

  return (
    <main className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">🧠 Avance Manual de Llave</h1>

      {combates.map((c) => (
        <LlaveInterfaz
          key={c.id}
          combate={c}
          seleccionarGanador={seleccionarGanador}
        />
      ))}

      {podio && (
        <div className="mt-10 p-4 bg-green-800 rounded text-white">
          <h2 className="text-xl font-bold mb-2">🏆 Resultados Finales</h2>
          <p>🥇 1°: {atletasMap[podio.primero]}</p>
          <p>🥈 2°: {atletasMap[podio.segundo]}</p>
          <p>🥉 3°: {podio.terceros.map((id) => atletasMap[id]).join(" y ")}</p>
        </div>
      )}
    </main>
  );
}