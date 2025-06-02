"use client";

import React, { useEffect, useState } from "react";
import { useLlaveManager } from "@/hooks/LlaveManager";
import LlaveInterfaz from "./LlaveInterfaz";

type Atleta = {
    id: string;
    nombre: string;
    genero: string;
    edad: number;
    peso: number;
    categoria: string;
    division: string;
};

function generarDivision(edad: number, peso: number, genero: string): { categoria: string, division: string } {
    let categoria = "";
    if (edad <= 11) categoria = "niños";
    else if (edad <= 17) categoria = "junior";
    else categoria = "mayores";

    const divisiones = {
        masculino: {
            niños: ["-30kg", "-36kg", "-42kg", "-48kg", "-54kg", "+54kg"],
            junior: ["-45kg", "-48kg", "-52kg", "-56kg", "-60kg", "-66kg", "-70kg", "+70kg"],
            mayores: ["-52kg", "-56kg", "-60kg", "-65kg", "-70kg", "-75kg", "-80kg", "+80kg"],
        },
        femenino: {
            niños: ["-28kg", "-34kg", "-40kg", "-46kg", "-52kg", "+52kg"],
            junior: ["-42kg", "-48kg", "-52kg", "-56kg", "-60kg", "-65kg", "+65kg"],
            mayores: ["-48kg", "-52kg", "-56kg", "-60kg", "-65kg", "-70kg", "-75kg", "-80kg", "-85kg", "-90kg", "-95kg", "-99kg",  "+100kg"],
        },
    };

    const grupos = divisiones[genero as "masculino" | "femenino"]?.[categoria] || [];
    let division = grupos.find((d) => {
        const num = parseInt(d);
        if (d.startsWith("-")) return peso <= num;
        if (d.startsWith("+")) return peso > parseInt(d.slice(1));
        return false;
    }) || "+99kg";

    return { categoria, division };
}

export default function LlavesPorGrupo() {
    const [atletas, setAtletas] = useState<Atleta[]>([]);
    const [genero, setGenero] = useState("masculino");
    const [categoria, setCategoria] = useState("mayores");
    const [division, setDivision] = useState("");

    const [nombreNuevo, setNombreNuevo] = useState("");
    const [edadNueva, setEdadNueva] = useState("");
    const [pesoNuevo, setPesoNuevo] = useState("");

    useEffect(() => {
        fetch("/inscripciones.json")
            .then((res) => res.json())
            .then((data) => setAtletas(data))
            .catch((err) => console.error("Error cargando inscripciones:", err));
    }, []);

    const agregarAtleta = () => {
        if (!nombreNuevo || !edadNueva || !pesoNuevo) return;

        const edad = parseInt(edadNueva);
        const peso = parseFloat(pesoNuevo);
        const { categoria: cat, division: div } = generarDivision(edad, peso, genero);

        const nuevo: Atleta = {
            id: "a" + (Date.now()),
            nombre: nombreNuevo,
            genero,
            edad,
            peso,
            categoria: cat,
            division: div,
        };

        setAtletas((prev) => [...prev, nuevo]);

        // Si el nuevo atleta coincide con el filtro actual, actualizamos la división
        if (cat === categoria) setDivision(div);

        setNombreNuevo("");
        setEdadNueva("");
        setPesoNuevo("");
    };

    const grupoFiltrado = atletas.filter(
        (a) =>
            a.genero === genero &&
            a.categoria === categoria &&
            a.division === division
    );

    const divisionesDisponibles = Array.from(
        new Set(
            atletas
                .filter((a) => a.genero === genero && a.categoria === categoria)
                .map((a) => a.division)
        )
    ).sort();

    const {
        combates,
        inicializarLlave4,
        seleccionarGanador,
        calcularPodio,
    } = useLlaveManager(grupoFiltrado);

     // useEffect(() => {
        // if (grupoFiltrado.length === 4 && combates.length === 0) {
         // inicializarLlave4();
        //}
      //}, [grupoFiltrado, combates.length]);
      

    const atletasMap = Object.fromEntries(grupoFiltrado.map((a) => [a.id, a.nombre]));
    const podio = calcularPodio();

    console.log("GRUPO FILTRADO:", grupoFiltrado.length, grupoFiltrado.map(a => a.nombre));
    
    return (
        <div className="p-6 max-w-6xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Visualizador de Llaves (con carga manual)</h1>

            {/* FILTROS */}
            <div className="flex gap-4 mb-4 justify-center">
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
                    <option value="">Seleccione división</option>
                    {divisionesDisponibles.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* CARGA MANUAL */}
            <div className="bg-gray-800 p-4 rounded mb-6">
                <h2 className="font-bold mb-2">Agregar atleta manualmente</h2>
                <div className="flex flex-wrap gap-2">
                    <input
                        value={nombreNuevo}
                        onChange={(e) => setNombreNuevo(e.target.value)}
                        placeholder="Nombre"
                        className="p-2 rounded text-black"
                    />
                    <input
                        value={edadNueva}
                        onChange={(e) => setEdadNueva(e.target.value)}
                        placeholder="Edad"
                        type="number"
                        className="p-2 rounded text-black w-20"
                    />
                    <input
                        value={pesoNuevo}
                        onChange={(e) => setPesoNuevo(e.target.value)}
                        placeholder="Peso"
                        type="number"
                        className="p-2 rounded text-black w-20"
                    />
                    <button onClick={agregarAtleta} className="bg-green-600 text-white px-4 py-2 rounded">
                        Agregar
                    </button>
                </div>
            </div>

            {/* LISTADO + LLAVE */}
            <div className="grid grid-cols-2 gap-6 mt-6">
                {/* Lista lateral */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Inscriptos</h2>
                    <ul className="bg-white text-black p-3 rounded space-y-1">
                        {grupoFiltrado.map((a) => (
                            <li key={a.id}>🥋 {a.nombre}</li>
                        ))}
                        {grupoFiltrado.length === 0 && <li>No hay atletas</li>}
                    </ul>
                </div>

                {/* Llave según cantidad */}
                <div>
                    {grupoFiltrado.length === 2 && (
                        <LlaveInterfaz
                            combate={{
                                id: "final",
                                ronda: "Final",
                                rojo: grupoFiltrado[0],
                                azul: grupoFiltrado[1],
                                ganadorId: null,
                            }}
                            seleccionarGanador={() => { }}
                        />
                    )}

                    {grupoFiltrado.length === 4 && (
                        <>
                            <button
                                onClick={inicializarLlave4}
                                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                            >
                                🎲 Sortear llave
                            </button>
                            {combates.map((c) => (
                                <LlaveInterfaz
                                    key={c.id}
                                    combate={c}
                                    seleccionarGanador={seleccionarGanador}
                                />
                            ))}
                            {podio && (
                                <div className="mt-6 p-4 bg-green-700 text-white rounded">
                                    <h2 className="text-xl font-bold mb-2">🏆 Resultados Finales</h2>
                                    <p>🥇 1°: {atletasMap[podio.primero]}</p>
                                    <p>🥈 2°: {atletasMap[podio.segundo]}</p>
                                    <p>🥉 3°: {podio.terceros.map((id) => atletasMap[id]).join(" y ")}</p>
                                </div>
                            )}
                        </>
                    )}

                    {grupoFiltrado.length > 0 && grupoFiltrado.length !== 2 && grupoFiltrado.length !== 4 && (
                        <div className="text-yellow-300">
                            ⚠️ Llave disponible solo para 2 o 4 atletas por ahora.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}