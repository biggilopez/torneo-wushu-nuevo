import React, { useEffect } from "react";

type Atleta = {
  id: string;
  nombre: string;
  numeroSorteo: number;
  peso?: number; // por si usas desempate por peso
  incidencias?: {
    graves: number;
    leves: number;
    cuentas: number;
  };
};

type Props = {
  atletasUbicados: (Atleta | null)[];
  resultados: { [combate: number]: string }; // combate: ganadorId
  setResultados: React.Dispatch<React.SetStateAction<{ [combate: number]: string }>>;
  onFinalizar: (podio: { primero: string; segundo: string; terceros: string[] }) => void;
};

export default function LlaveVisual3({ atletasUbicados, resultados, setResultados, onFinalizar }: Props) {
  if (atletasUbicados.length < 3) {
    return <div className="text-red-500">Faltan atletas para el round robin de 3.</div>;
  }
  const [a1, a2, a3] = atletasUbicados;

  // Definir los combates en el orden reglamentario
  const combates = [
    { id: 1, a: a3, b: a2 },
    { id: 2, a: a1, b: a3 },
    { id: 3, a: a1, b: a2 },
  ];

  // Calcular puntuaciones y podio cuando terminan los combates
  useEffect(() => {
    if (Object.keys(resultados).length === 3) {
      // Conteo de victorias por id
      const recuento: { [id: string]: number } = {};
      [a1, a2, a3].forEach(a => { if (a) recuento[a.id] = 0; });
      Object.values(resultados).forEach(id => { recuento[id] += 1; });
      // Ordena ids por victorias
      const orden = Object.entries(recuento).sort((a, b) => b[1] - a[1]);

      // ¿Triple empate?
      if (orden[0][1] === 1 && orden[1][1] === 1 && orden[2][1] === 1) {
        // Aplica desempate por incidencias primero, luego por peso si sigue empate
        const ids = [a1, a2, a3].map(a => a!.id);
        const atletas = [a1, a2, a3];

        // Función para obtener incidencias totales (graves, leves, cuentas)
        function incidenciasTotales(a?: Atleta) {
          return [
            a?.incidencias?.graves ?? 0,
            a?.incidencias?.leves ?? 0,
            a?.incidencias?.cuentas ?? 0,
          ];
        }

        // Ordena por incidencias
        const ordenDesempate = [...atletas].sort((x, y) => {
          const ix = incidenciasTotales(x);
          const iy = incidenciasTotales(y);
          // Primero graves, luego leves, luego cuentas
          for (let i = 0; i < 3; i++) {
            if (ix[i] !== iy[i]) return ix[i] - iy[i];
          }
          // Si sigue empate, por peso (menor primero)
          return (x?.peso ?? 9999) - (y?.peso ?? 9999);
        });

        const primero = ordenDesempate[0]?.id!;
        const segundo = ordenDesempate[1]?.id!;
        const terceros = [ordenDesempate[2]?.id!];

        onFinalizar({ primero, segundo, terceros });
        return;
      }

      // Si hay empate solo en segundo o tercero, puedes mejorar aquí el desempate, pero por ahora:
      const primero = orden[0][0];
      const segundo = orden[1][0];
      const terceros = [orden[2][0]];
      onFinalizar({ primero, segundo, terceros });
    }
  }, [resultados, a1, a2, a3, onFinalizar]);

  function seleccionarGanador(combateId: number, ganadorId: string) {
    setResultados(prev => ({ ...prev, [combateId]: ganadorId }));
  }

  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg font-semibold">Round Robin (3 atletas)</h2>
      {combates.map(({ id, a, b }) => (
        <div key={id}>
          <p className="font-semibold">Combate {id}:</p>
          <p>
            {a?.nombre || "BYE"} vs {b?.nombre || "BYE"}
            {!resultados[id] && a && b && (
              <span>
                {" "}
                <button onClick={() => seleccionarGanador(id, a.id)} className="bg-green-700 px-2 py-1 rounded ml-2">Gana {a.nombre}</button>
                <button onClick={() => seleccionarGanador(id, b.id)} className="bg-green-700 px-2 py-1 rounded ml-2">Gana {b.nombre}</button>
              </span>
            )}
            {resultados[id] && (
              <span className="ml-2 text-yellow-300">
                Ganador: {a?.id === resultados[id] ? a?.nombre : b?.nombre}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}