import React, { useState } from "react";

const atletas3 = [
  { id: "a", nombre: "Ana", genero: "femenino", edad: 18, peso: 52, categoria: "mayores", division: "A" },
  { id: "b", nombre: "Beti", genero: "femenino", edad: 19, peso: 51, categoria: "mayores", division: "A" },
  { id: "c", nombre: "Carla", genero: "femenino", edad: 18, peso: 53, categoria: "mayores", division: "A" }
];

export default function TestRR3() {
  const [atletasSorteados, setAtletasSorteados] = useState([]);
  return (
    <div>
      <button
        onClick={() => {
          const mezclados = [...atletas3].sort(() => Math.random() - 0.5);
          const atletasNumerados = mezclados.map((a, i) => ({ ...a, numeroSorteo: i + 1 }));
          console.log("SORTEADOS:", atletasNumerados);
          setAtletasSorteados(atletasNumerados);
        }}
      >SORTEAR</button>
      <pre>{JSON.stringify(atletasSorteados, null, 2)}</pre>
    </div>
  );
}