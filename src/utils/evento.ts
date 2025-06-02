 export function obtenerNombreEvento(): string {
 return localStorage.getItem("NombreEvento") || "Torneo Regional de Wushu Sanda";
}
