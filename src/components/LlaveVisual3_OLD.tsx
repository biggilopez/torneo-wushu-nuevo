import { guardarPodioEnLocalStorage } from './podio';

console.log("LlaveVisual3 atletasUbicados", atletasUbicados);
onFinalizar={(podio) => {
  guardarPodioEnLocalStorage({
    genero,
    categoria,
    division,
    primero: atletasLlave3.find(a => a.id === podio.primero),
    segundo: atletasLlave3.find(a => a.id === podio.segundo),
    terceros: atletasLlave3.filter(a => podio.terceros.includes(a.id)),
  });
}}S