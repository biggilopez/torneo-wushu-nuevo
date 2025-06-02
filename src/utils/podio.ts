export function guardarPodioEnLocalStorage(podio: {
  genero: string;
  categoria: string;
  division: string;
  primero: string;
  segundo: string;
  terceros: string[];
}) {
  try {
    const clave = "podios";
    const previos = JSON.parse(localStorage.getItem(clave) || "[]");

    const yaExiste = previos.some(
      (p: any) =>
        p.genero === podio.genero &&
        p.categoria === podio.categoria &&
        p.division === podio.division
    );

    if (!yaExiste) {
      previos.push(podio);
      localStorage.setItem(clave, JSON.stringify(previos));
    }
  } catch (e) {
    console.error("Error guardando podio:", e);
  }
}
