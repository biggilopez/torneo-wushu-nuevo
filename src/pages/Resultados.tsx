import React, { useEffect, useState } from "react";

type Podio = {
  genero: string;
  categoria: string;
  division: string;
  primero: string;
  segundo: string;
  terceros: string[];
};

export default function Resultados() {
  const [resultados, setResultados] = useState<Podio[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem("podios");
    if (guardados) {
      try {
        const datos = JSON.parse(guardados);
        setResultados(Array.isArray(datos) ? datos : []);
      } catch (e) {
        console.error("Error leyendo resultados:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🏅 Resultados Finales</h1>

      <div className="mb-6">
        <button
          onClick={() => window.location.href = "/"}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
        >
          ⬅️ Volver al panel
        </button>
      </div>

      {resultados.length === 0 ? (
        <p className="text-center text-gray-400">No hay resultados guardados.</p>
      ) : (
        <div className="space-y-4">
          {resultados.map((p, i) => (
            <div key={i} className="bg-green-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                {p.genero.toUpperCase()} / {p.categoria.toUpperCase()} / {p.division}
              </h2>
              <p>🥇 1°: {
  // Si podio.primero es objeto, usa su nombre. Si es ID, busca en atletasMap o muestra el ID.
  typeof podio.primero === "object"
    ? podio.primero.nombre
    : atletasMap[podio.primero] || podio.primero
}</p>
<p>🥈 2°: {
  typeof podio.segundo === "object"
    ? podio.segundo.nombre
    : atletasMap[podio.segundo] || podio.segundo
}</p>
{podio.terceros && podio.terceros.length > 0 && (
  <p>🥉 3°: {
    podio.terceros
      .map((t: any) =>
        typeof t === "object"
          ? t.nombre
          : atletasMap[t] || t
      )
      .join(" y ")
  }</p>
)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
