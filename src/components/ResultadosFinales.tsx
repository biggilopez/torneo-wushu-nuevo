// src/components/ResultadosFinales.tsx
import React from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
};

type Props = {
  atletas: (Atleta | null)[];
};

export default function ResultadosFinales({ atletas }: Props) {
  if (!atletas || atletas.length < 2) return null;

  const nombre = (n: number) => atletas[n - 1]?.nombre || "BYE";

  // Asumimos que ganan los que están primero en cada cruce
  const simulacion = (cantidad: number): { primero: string; segundo: string; terceros: string[] } => {
    switch (cantidad) {
      case 2:
        return {
          primero: nombre(1),
          segundo: nombre(2),
          terceros: [],
        };
      case 3:
        return {
          primero: nombre(1),
          segundo: nombre(2),
          terceros: [nombre(3)],
        };
      case 4:
        return {
          primero: nombre(1),
          segundo: nombre(4),
          terceros: [nombre(3), nombre(2)],
        };
      case 5:
        return {
          primero: nombre(1),
          segundo: nombre(2),
          terceros: [nombre(3), nombre(4)],
        };
      case 6:
        return {
          primero: nombre(1),
          segundo: nombre(2),
          terceros: [nombre(3), nombre(4)],
        };
      case 7:
        return {
          primero: nombre(1),
          segundo: nombre(2),
          terceros: [nombre(3), nombre(4)],
        };
      case 8:
        return {
          primero: nombre(1),
          segundo: nombre(2),
          terceros: [nombre(3), nombre(4)],
        };
      default:
        return {
          primero: "-",
          segundo: "-",
          terceros: [],
        };
    }
  };

  const resultado = simulacion(atletas.length);

  return (
    <div className="mt-6 bg-green-100 p-4 rounded text-black">
      <h3 className="text-lg font-bold mb-2">🏆 Resultados Finales (simulados)</h3>
      <p>🥇 1º Lugar: {resultado.primero}</p>
      <p>🥈 2º Lugar: {resultado.segundo}</p>
      <p>🥉 3º Lugar: {resultado.terceros.join(" y ")}</p>
    </div>
  );
}
