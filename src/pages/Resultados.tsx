import React from "react";

// Función para leer podio según selección
function leerPodioDeLocalStorage({ genero, categoria, division }: { genero: string; categoria: string; division: string }) {
  const clave = `podio-${genero}-${categoria}-${division}`;
  const data = localStorage.getItem(clave);
  if (data) return JSON.parse(data);
  return null;
}

type Atleta = {
  id: string;
  nombre: string;
  // agrega otros campos si los necesitas
};

type Props = {
  genero: string;
  categoria: string;
  division: string;
};

export default function Resultados({ genero, categoria, division }: Props) {
  const podio = leerPodioDeLocalStorage({ genero, categoria, division });

  if (!podio) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded">
        <h2 className="text-xl font-bold mb-2">Resultados Finales</h2>
        <p>No hay podio registrado para esta categoría aún.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded">
      <h2 className="text-xl font-bold mb-2">Resultados Finales</h2>
      <div className="mb-2">
        <span className="font-bold">🥇 1°:</span>{" "}
        {podio.primero?.nombre ?? podio.primero}
      </div>
      <div className="mb-2">
        <span className="font-bold">🥈 2°:</span>{" "}
        {podio.segundo?.nombre ?? podio.segundo}
      </div>
      <div>
        <span className="font-bold">🥉 3°:</span>{" "}
        {Array.isArray(podio.terceros)
          ? podio.terceros.map((t: any, i: number) =>
              (t?.nombre ?? t) + (i < podio.terceros.length - 1 ? " y " : "")
            )
          : podio.terceros}
      </div>
    </div>
  );
}