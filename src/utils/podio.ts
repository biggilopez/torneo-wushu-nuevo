export function guardarPodioEnLocalStorage({
  genero,
  categoria,
  division,
  primero,
  segundo,
  terceros
}: {
  genero: string;
  categoria: string;
  division: string;
  primero: any; // objeto atleta
  segundo: any;
  terceros: any[];
}) {
  const clave = `podio-${genero}-${categoria}-${division}`;
  const podio = { primero, segundo, terceros };
  localStorage.setItem(clave, JSON.stringify(podio));
}
