import { useState, useEffect } from "react";


export type Atleta = {
  id: string;
  nombre: string;
};

export type Combate = {
  id: string;
  ronda: string;
  rojo: Atleta | null;
  azul: Atleta | null;
  ganadorId: string | null;
  ordenCombate?: string;
};

export function useLlaveManager() {
  const [combates, setCombates] = useState<Combate[]>([]);

function actualizarOrdenCombate(id: string, nuevoOrden: string) {
  setCombates((prev) => {
    const nuevos = prev.map((c) =>
      c.id === id ? { ...c, ordenCombate: nuevoOrden } : c
    );
    // Guardar en localStorage
    localStorage.setItem("ordenCombates", JSON.stringify(nuevos));
    return nuevos;
  });
}
useEffect(() => {
  const guardados = localStorage.getItem("ordenCombates");
  if (guardados) {
    try {
      const datos = JSON.parse(guardados);
      setCombates((prev) =>
        prev.map((c) => {
          const encontrado = datos.find((d: Combate) => d.id === c.id);
          return encontrado ? { ...c, ordenCombate: encontrado.ordenCombate } : c;
        })
      );
    } catch (e) {
      console.error("Error leyendo ordenCombates:", e);
    }
  }
}, []);

  const inicializarLlave3 = (atletas: Atleta[]) => {
    if (atletas.length !== 3) return;

    const [a1, a2, a3] = atletas;

    const nuevo: Combate[] = [
      { id: "c1", ronda: "Combate 1: 2 vs 3", rojo: a2, azul: a3, ganadorId: null },
      { id: "c2", ronda: "Combate 2: 1 vs 3", rojo: a1, azul: a3, ganadorId: null },
      { id: "c3", ronda: "Combate 3: 1 vs 2", rojo: a1, azul: a2, ganadorId: null },
    ];

    setCombates(nuevo);
  };

  const inicializarLlave4 = (atletas: Atleta[]) => {
    if (atletas.length !== 4) return;

    const mezclados = [...atletas].sort(() => Math.random() - 0.5);
    const [a1, a2, a3, a4] = mezclados;

    const nuevo: Combate[] = [
      { id: "semi1", ronda: "Semifinal 1", rojo: a1, azul: a3, ganadorId: null },
      { id: "semi2", ronda: "Semifinal 2", rojo: a2, azul: a4, ganadorId: null },
      { id: "final", ronda: "Final", rojo: null, azul: null, ganadorId: null },
    ];

    setCombates(nuevo);
  };

  const inicializarLlaveCajon = (atletas: Atleta[]) => {
    const n = atletas.length;
    if (n < 5 || n > 8) return;

    const sorteados = [...atletas].sort(() => Math.random() - 0.5);
    const mapa: Record<number, Atleta> = {};
    sorteados.forEach((a, i) => {
      mapa[i + 1] = a;
    });

    let nuevo: Combate[] = [];

    if (n === 5) {
      nuevo = [
        { id: "p1", ronda: "Eliminatoria previa", rojo: mapa[5], azul: mapa[4], ganadorId: null },
        { id: "semi1", ronda: "Semifinal 1", rojo: mapa[1], azul: null, ganadorId: null },
        { id: "semi2", ronda: "Semifinal 2", rojo: mapa[3], azul: mapa[2], ganadorId: null },
        { id: "final", ronda: "Final", rojo: null, azul: null, ganadorId: null },
      ];
    } else if (n === 6) {
      nuevo = [
        { id: "p1", ronda: "Eliminatoria previa 1", rojo: mapa[5], azul: mapa[4], ganadorId: null },
        { id: "p2", ronda: "Eliminatoria previa 2", rojo: mapa[6], azul: mapa[3], ganadorId: null },
        { id: "semi1", ronda: "Semifinal 1", rojo: mapa[1], azul: null, ganadorId: null },
        { id: "semi2", ronda: "Semifinal 2", rojo: null, azul: mapa[2], ganadorId: null },
        { id: "final", ronda: "Final", rojo: null, azul: null, ganadorId: null },
      ];
    } else if (n === 7) {
      nuevo = [
        { id: "p1", ronda: "Eliminatoria 1: 5 vs 4", rojo: mapa[5], azul: mapa[4], ganadorId: null },
        { id: "p2", ronda: "Eliminatoria 2: 6 vs 3", rojo: mapa[6], azul: mapa[3], ganadorId: null },
        { id: "p3", ronda: "Eliminatoria 3: 7 vs 2", rojo: mapa[7], azul: mapa[2], ganadorId: null },
        { id: "semi1", ronda: "Semifinal 1", rojo: mapa[1], azul: null, ganadorId: null },
        { id: "semi2", ronda: "Semifinal 2", rojo: null, azul: null, ganadorId: null },
        { id: "final", ronda: "Final", rojo: null, azul: null, ganadorId: null },
      ];
    } else if (n === 8) {
      const posiciones = [1, 8, 5, 4, 3, 6, 7, 2];
      const slots: (Atleta | null)[] = Array(8).fill(null);
      sorteados.forEach((a, i) => {
        const pos = posiciones[i] - 1;
        slots[pos] = a;
      });

      nuevo = [
        { id: "c1", ronda: "Cuartos", rojo: slots[0], azul: slots[7], ganadorId: null },
        { id: "c2", ronda: "Cuartos", rojo: slots[4], azul: slots[3], ganadorId: null },
        { id: "c3", ronda: "Cuartos", rojo: slots[2], azul: slots[5], ganadorId: null },
        { id: "c4", ronda: "Cuartos", rojo: slots[6], azul: slots[1], ganadorId: null },
        { id: "semi1", ronda: "Semifinal 1", rojo: null, azul: null, ganadorId: null },
        { id: "semi2", ronda: "Semifinal 2", rojo: null, azul: null, ganadorId: null },
        { id: "final", ronda: "Final", rojo: null, azul: null, ganadorId: null },
      ];
    }

    setCombates(nuevo);
  };

  const seleccionarGanador = (combateId: string, ganador: "rojo" | "azul") => {
  setCombates((prev) => {
    const actualizados = prev.map((c) => {
      if (c.id === combateId) {
        const ganadorId = ganador === "rojo" ? c.rojo?.id || "" : c.azul?.id || "";
        return { ...c, ganadorId };
      }
      return c;
    });

    const getGanador = (id: string): Atleta | null => {
      const c = actualizados.find((x) => x.id === id);
      if (!c || !c.ganadorId) return null;
      return c.rojo?.id === c.ganadorId ? c.rojo : c.azul;
    };

    const semi1 = actualizados.find((c) => c.id === "semi1");
    const semi2 = actualizados.find((c) => c.id === "semi2");
    const final = actualizados.find((c) => c.id === "final");

    const avanzarSi = (prevId: string, semId: string, pos: "rojo" | "azul") => {
      const previa = actualizados.find((c) => c.id === prevId);
      const semi = actualizados.find((c) => c.id === semId);
      if (previa?.ganadorId && semi && !semi[pos]) {
        semi[pos] = getGanador(prevId);
      }
    };

    avanzarSi("p1", "semi1", "azul");
    avanzarSi("p2", "semi2", "rojo");
    avanzarSi("p3", "semi2", "azul");
    avanzarSi("c1", "semi1", "rojo");
    avanzarSi("c2", "semi1", "azul");
    avanzarSi("c3", "semi2", "rojo");
    avanzarSi("c4", "semi2", "azul");

    // Avance a la final
    if (
      semi1?.ganadorId &&
      semi2?.ganadorId &&
      final &&
      (!final.rojo || !final.azul)
    ) {
      final.rojo = getGanador("semi1");
      final.azul = getGanador("semi2");
    }

    return actualizados;
  });
  };

  const calcularPodio = () => {
  const final = combates.find((c) => c.id === "final");

  if (!final || !final.ganadorId || !final.rojo || !final.azul) return null;

  const primero = final.ganadorId;
  const segundo = final.ganadorId === final.rojo.id ? final.azul.id : final.rojo.id;


  const semi1 = combates.find((c) => c.id === "semi1");
  const semi2 = combates.find((c) => c.id === "semi2");

  const terceros: string[] = [];

  if (semi1?.ganadorId && semi1.rojo && semi1.azul) {
    const perdedor = semi1.ganadorId === semi1.rojo.id ? semi1.azul.id : semi1.rojo.id;
    terceros.push(perdedor);
  }

  if (semi2?.ganadorId && semi2.rojo && semi2.azul) {
    const perdedor = semi2.ganadorId === semi2.rojo.id ? semi2.azul.id : semi2.rojo.id;
    terceros.push(perdedor);
  }

  return { primero, segundo, terceros };
};

  return {
    combates,
    setCombates,
    inicializarLlave3,
    inicializarLlave4,
    inicializarLlaveCajon,
    seleccionarGanador,
    actualizarOrdenCombate,
    calcularPodio,
  };
}
