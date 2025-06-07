import React, { useEffect, useState } from "react";
import { useLlaveManager } from "@/hooks/LlaveManager";
import LlaveInterfaz from "@/components/LlaveInterfaz";
import CombateDos from "@/components/CombateDos";
import { guardarPodioEnLocalStorage } from "@/utils/podio";
import { obtenerNombreEvento } from "@/utils/evento";
// * nuevo * //
import LlaveVisual3 from "@/components/LlaveVisual3";


type Atleta = {
  id: string;
  nombre: string;
  genero: string;
  edad: number;
  peso: number;
  categoria: string;
  division: string;
};

export default function VisualizadorDeLlaves() {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [genero, setGenero] = useState("masculino");
  const [categoria, setCategoria] = useState("mayores");
  const [division, setDivision] = useState("");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [edadNueva, setEdadNueva] = useState("");
  const [pesoNuevo, setPesoNuevo] = useState("");
  const [generoNuevo, setGeneroNuevo] = useState("masculino");
  const [ultimoAgregadoId, setUltimoAgregadoId] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState("");
  const [botonCargando, setBotonCargando] = useState(false);

  const {
    combates,
    inicializarLlave3,
    inicializarLlave4,
    inicializarLlaveCajon,
    seleccionarGanador,
    actualizarOrdenCombate,
    calcularPodio,
  } = useLlaveManager();

// Nuevo estado para los atletas sorteados y resultados del round robin
const [atletasLlave3, setAtletasLlave3] = useState<(Atleta | null)[]>([]);
const [resultados3, setResultados3] = useState<{ [combate: number]: string }>({});
  
  const [incidencias, setIncidencias] = useState<Record<
    string,
    { leves: number; graves: number; cuentas: number; peso: number }
  >>({});

  useEffect(() => {
  const local = localStorage.getItem("inscripciones");
  if (local) {
  setAtletas(JSON.parse(local));
  return;
  }
    fetch("/inscripciones.json")
      .then((res) => res.json())
      .then((data) => setAtletas(data))
      .catch((err) => console.error("Error cargando inscripciones:", err));
  }, []);

  const grupoFiltrado = atletas.filter(
    (a) => a.genero === genero && a.categoria === categoria && a.division === division
  );

  const divisionesDisponibles = Array.from(
    new Set(
      atletas
        .filter((a) => a.genero === genero && a.categoria === categoria)
        .map((a) => a.division)
    )
  ).sort();

  const atletasMap = Object.fromEntries(grupoFiltrado.map((a) => [a.id, a.nombre]));

  function calcularCategoriaDivision(edad: number, peso: number, genero: string) {
    let categoria = "";
    if (edad <= 11) categoria = "niños";
    else if (edad <= 17) categoria = "junior";
    else categoria = "mayores";

    const divisiones: Record<string, Record<string, string[]>> = {
      masculino: {
        niños: ["-30kg", "-36kg", "-42kg", "-48kg", "-54kg", "+54kg"],
        junior: ["-45kg", "-52kg", "-60kg", "-66kg", "-70kg", "+70kg"],
        mayores: ["-52kg", "-56kg", "-60kg", "-65kg", "-70kg", "-75kg", "-80kg", "+80kg"],
      },
      femenino: {
        niños: ["-28kg", "-34kg", "-40kg", "-46kg", "-52kg", "+52kg"],
        junior: ["-42kg", "-48kg", "-52kg", "-56kg", "-60kg", "-65kg", "+65kg"],
        mayores: ["-48kg", "-52kg", "-56kg", "-60kg", "-65kg", "-70kg", "+70kg"],
      },
    };

    const grupos = divisiones[genero]?.[categoria] || [];
    const divisionCalculada =
      grupos.find((d) => {
        if (d.startsWith("-")) return peso <= parseInt(d.slice(1));
        if (d.startsWith("+")) return peso > parseInt(d.slice(1));
        return false;
      }) || "+99kg";

    return { categoria, division: divisionCalculada };
  }

  function agregarAtleta() {
    if (!nombreNuevo || !edadNueva || !pesoNuevo) return;
    const edad = parseInt(edadNueva);
    const peso = parseFloat(pesoNuevo);
    const { categoria: nuevaCat, division: nuevaDiv } = calcularCategoriaDivision(edad, peso, generoNuevo);

    const nuevo: Atleta = {
      id: "a" + Date.now(),
      nombre: nombreNuevo,
      genero: generoNuevo,
      edad,
      peso,
      categoria: nuevaCat,
      division: nuevaDiv,
    };

    setAtletas((prev) => [...prev, nuevo]);
    setUltimoAgregadoId(nuevo.id);
    setGenero(generoNuevo);
    setCategoria(nuevaCat);
    setDivision(nuevaDiv);
    setNombreNuevo("");
    setEdadNueva("");
    setPesoNuevo("");
    setMensajeExito(`✅ ${nuevo.nombre} agregado a ${nuevaCat} - ${nuevaDiv}`);
    setTimeout(() => setMensajeExito(""), 3000);
  }

  const calcularPodioRoundRobin = () => {
  // Conteo de victorias por atleta
  const conteo: Record<string, number> = {};
  combates.forEach((c) => {
    if (c.ganadorId) conteo[c.ganadorId] = (conteo[c.ganadorId] || 0) + 1;
  });

  const participantes = grupoFiltrado.map((a) => a.id);

  // Solo calcula podio si están resueltas las 3 peleas
  if (Object.values(conteo).reduce((a, b) => a + b, 0) < 3) return null;

  // Ordenamiento por victorias e incidencias (personaliza según tu lógica)
  const ordenados = [...participantes].sort((a, b) => {
    const ia = incidencias[a] || { leves: 0, graves: 0, cuentas: 0, peso: 100 };
    const ib = incidencias[b] || { leves: 0, graves: 0, cuentas: 0, peso: 100 };
    const vA = conteo[a] || 0;
    const vB = conteo[b] || 0;

    if (vA !== vB) return vB - vA; // Más victorias primero
    if (ia.leves !== ib.leves) return ia.leves - ib.leves;
    if (ia.graves !== ib.graves) return ia.graves - ib.graves;
    if (ia.cuentas !== ib.cuentas) return ia.cuentas - ib.cuentas;
    return ia.peso - ib.peso; // Menor peso primero
  });

  return {
    primero: ordenados[0],
    segundo: ordenados[1],
    tercero: ordenados[2],
  };
};

  return (
  <>
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">{obtenerNombreEvento()}</h1>

      {/* Selectores */}
      <div className="flex gap-4 mb-6 justify-center">
        <select value={genero} onChange={(e) => setGenero(e.target.value)} className="text-black px-2 py-1 rounded">
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="text-black px-2 py-1 rounded">
          <option value="niños">Niños</option>
          <option value="junior">Junior</option>
          <option value="mayores">Mayores</option>
        </select>
        <select value={division} onChange={(e) => setDivision(e.target.value)} className="text-black px-2 py-1 rounded">
          <option value="">División</option>
          {divisionesDisponibles.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Agregar atleta */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="font-bold mb-2">Agregar atleta manualmente</h2>
        <div className="flex flex-wrap gap-2">
          <input value={nombreNuevo} onChange={(e) => setNombreNuevo(e.target.value)} placeholder="Nombre" className="p-2 rounded text-black" />
          <input value={edadNueva} onChange={(e) => setEdadNueva(e.target.value)} placeholder="Edad" type="number" className="p-2 rounded text-black w-20" />
          <input value={pesoNuevo} onChange={(e) => setPesoNuevo(e.target.value)} placeholder="Peso" type="number" className="p-2 rounded text-black w-20" />
          <select value={generoNuevo} onChange={(e) => setGeneroNuevo(e.target.value)} className="p-2 rounded text-black">
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <button onClick={agregarAtleta} className="bg-green-600 text-white px-4 py-2 rounded">Agregar</button>
        </div>
        {mensajeExito && <div className="text-green-400 mt-2">{mensajeExito}</div>}
      </div>

      {/* Lista inscriptos */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Inscriptos</h2>
        <ul className="bg-white text-black p-3 rounded space-y-1">
          {grupoFiltrado.map((a) => (
            <li key={a.id} className={`p-1 rounded ${a.id === ultimoAgregadoId ? "bg-yellow-200 font-semibold" : ""}`}>🥋 {a.nombre}</li>
          ))}
          {grupoFiltrado.length === 0 && <li>No hay atletas</li>}
        </ul>
      </div>

      {/* Combates y llaves */}
      <div>
        {grupoFiltrado.length === 2 && (
  <CombateDos
    atletas={grupoFiltrado}
    onFinalizado={(ganador, perdedor) => {
      guardarPodioEnLocalStorage({
        genero,
        categoria,
        division,
        primero: ganador.id,
        segundo: perdedor.id,
        terceros: [],
      });
    }}
  />
)}
        {grupoFiltrado.length === 3 && (
  <>
    <button
      onClick={() => {
        setAtletasLlave3([...grupoFiltrado]);
        setResultados3({});
      }}
      className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
    >
      🎲 Iniciar round-robin
    </button>

    {/* Panel de incidencias */}
    <div className="bg-gray-700 p-4 rounded mb-4">
      <h3 className="font-bold mb-2">Registro de Incidencias</h3>
      <table className="text-white w-full text-sm">
        <thead>
          <tr>
            <th>Atleta</th>
            <th>Leves</th>
            <th>Graves</th>
            <th>Cuentas</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          {grupoFiltrado.map((a) => (
            <tr key={a.id}>
              <td>{a.nombre}</td>
              {["leves", "graves", "cuentas"].map((campo) => (
                <td key={campo}>
                  <input
                    type="number"
                    min={0}
                    defaultValue={0}
                    className="w-16 text-black rounded p-1"
                    onChange={(e) =>
                      setIncidencias((prev) => ({
                        ...prev,
                        [a.id]: {
                          ...(prev[a.id] || {}),
                          [campo]: parseInt(e.target.value) || 0,
                          peso: prev[a.id]?.peso || a.peso,
                        },
                      }))
                    }
                  />
                </td>
              ))}
              <td>
                <input
                  type="number"
                  step="0.1"
                  defaultValue={a.peso}
                  className="w-20 text-black rounded p-1"
                  onChange={(e) =>
                    setIncidencias((prev) => ({
                      ...prev,
                      [a.id]: {
                        ...(prev[a.id] || {}),
                        leves: prev[a.id]?.leves || 0,
                        graves: prev[a.id]?.graves || 0,
                        cuentas: prev[a.id]?.cuentas || 0,
                        peso: parseFloat(e.target.value) || a.peso,
                      },
                    }))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mostrar fixture y selección de ganadores */}
    {atletasLlave3.length === 3 && (
      <LlaveVisual3
        atletasUbicados={atletasLlave3}
        resultados={resultados3}
        setResultados={setResultados3}
        onFinalizar={(podio) => {
          // Guardar podio en localStorage
          const podiosGuardados = JSON.parse(localStorage.getItem("podios") || "[]");
          podiosGuardados.push({
            genero,
            categoria,
            division,
            primero: podio.primero,
            segundo: podio.segundo,
            terceros: podio.terceros,
          });
          localStorage.setItem("podios", JSON.stringify(podiosGuardados));
        }}
      />
    )}
  </>
)}

        {grupoFiltrado.length >= 4 && grupoFiltrado.length <= 8 && (
          <>
            <button
              onClick={() => {
                setBotonCargando(true);
                setTimeout(() => {
                  if (grupoFiltrado.length === 4) inicializarLlave4(grupoFiltrado);
                  else inicializarLlaveCajon(grupoFiltrado);
                  setBotonCargando(false);
                }, 1000);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
              disabled={botonCargando}
            >
              {botonCargando ? "🎲 Sorteando..." : "🎲 Iniciar llave"}
            </button>

            {combates.map((c) => (
              <LlaveInterfaz
                key={c.id}
                combate={c}
                seleccionarGanador={seleccionarGanador}
                actualizarOrdenCombate={actualizarOrdenCombate}
              />
            ))}

            {/* BLOQUE PARA MOSTRAR Y GUARDAR EL PODIO EN LLAVES ELIMINATORIAS */}
            {(() => {
              const podio = calcularPodio();
              if (podio) {
                guardarPodioEnLocalStorage({
                  genero,
                  categoria,
                  division,
                  primero: atletasMap[podio.primero],
                  segundo: atletasMap[podio.segundo],
                  terceros: podio.terceros.map(id => atletasMap[id]),
                });
                return (
                  <div className="mt-6 p-4 bg-green-700 text-white rounded">
                    <h2 className="text-xl font-bold mb-2">🏆 Resultados Finales</h2>
                    <p>🥇 1°: {atletasMap[podio.primero]}</p>
                    <p>🥈 2°: {atletasMap[podio.segundo]}</p>
                    <p>🥉 3°: {podio.terceros.map(id => atletasMap[id]).join(" y ")}</p>
                  </div>
                );
              }
              return null;
            })()}
          </>
        )}
      </div>

      <div className="mt-8 text-center">
        <a href="/" className="text-blue-400 hover:underline">⬅️ Volver al panel</a>
      </div>
    </div>
  </>
);
}
