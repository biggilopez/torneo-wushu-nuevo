import React from "react";

type Incidencias = {
  leves: number;
  graves: number;
  cuentas: number;
  peso: number;
};

type Atleta = {
  id: string;
  nombre: string;
};

type Props = {
  atletas: (Atleta & { numeroSorteo: number })[];
  incidencias: Record<string, Incidencias>;
  setIncidencias: (id: string, tipo: keyof Incidencias, value: number) => void;
};

export default function PanelIncidenciasRoundRobin({
  atletas,
  incidencias,
  setIncidencias,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      {atletas.map((atleta) => {
        const inc = incidencias[atleta.id] || { leves: 0, graves: 0, cuentas: 0, peso: 0 };
        return (
          <div
            key={atleta.id}
            style={{
              background: "#222",
              borderRadius: 12,
              padding: "1em 1.2em",
              minWidth: 140,
              boxShadow: "0 2px 12px #0004",
              textAlign: "center",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>
              Nº {atleta.numeroSorteo} {atleta.nombre}
            </div>
            {/* Tarjetas verticales */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Faltas leves */}
              <div
                style={{
                  background: "#ffe066",
                  color: "#444",
                  borderRadius: 8,
                  width: 60,
                  height: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px #0002",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: "bold" }}>🟨</span>
                <span style={{ fontWeight: "bold" }}>{inc.leves}</span>
                <div style={{ fontSize: 11, marginTop: 2 }}>Leves</div>
                <div>
                  <button onClick={() => setIncidencias(atleta.id, "leves", inc.leves + 1)}>
                    +
                  </button>
                  <button
                    onClick={() =>
                      setIncidencias(atleta.id, "leves", Math.max(0, inc.leves - 1))
                    }
                  >
                    -
                  </button>
                </div>
              </div>
              {/* Faltas graves */}
              <div
                style={{
                  background: "#ff595e",
                  color: "#fff",
                  borderRadius: 8,
                  width: 60,
                  height: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px #0002",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: "bold" }}>🟥</span>
                <span style={{ fontWeight: "bold" }}>{inc.graves}</span>
                <div style={{ fontSize: 11, marginTop: 2 }}>Graves</div>
                <div>
                  <button onClick={() => setIncidencias(atleta.id, "graves", inc.graves + 1)}>
                    +
                  </button>
                  <button
                    onClick={() =>
                      setIncidencias(atleta.id, "graves", Math.max(0, inc.graves - 1))
                    }
                  >
                    -
                  </button>
                </div>
              </div>
              {/* Cuentas */}
              <div
                style={{
                  background: "#1982c4",
                  color: "#fff",
                  borderRadius: 8,
                  width: 60,
                  height: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px #0002",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: "bold" }}>🟦</span>
                <span style={{ fontWeight: "bold" }}>{inc.cuentas}</span>
                <div style={{ fontSize: 11, marginTop: 2 }}>Cuentas</div>
                <div>
                  <button onClick={() => setIncidencias(atleta.id, "cuentas", inc.cuentas + 1)}>
                    +
                  </button>
                  <button
                    onClick={() =>
                      setIncidencias(atleta.id, "cuentas", Math.max(0, inc.cuentas - 1))
                    }
                  >
                    -
                  </button>
                </div>
              </div>
              {/* Peso */}
              <div
                style={{
                  background: "#aaa",
                  color: "#222",
                  borderRadius: 8,
                  width: 60,
                  height: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px #0002",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: "bold" }}>⚖️</span>
                <input
                  type="number"
                  value={inc.peso}
                  style={{
                    width: 40,
                    textAlign: "center",
                    fontWeight: "bold",
                    background: "#eee",
                    border: "none",
                    borderRadius: 4,
                  }}
                  onChange={(e) =>
                    setIncidencias(atleta.id, "peso", parseFloat(e.target.value) || 0)
                  }
                />
                <div style={{ fontSize: 11, marginTop: 2 }}>KG</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}