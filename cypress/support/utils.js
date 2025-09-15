// se define la data dinámica para que las pruebas que requieren siempre usuarios nuevos no nos fallen como registro

export function generarCorreo() {
  const timestamp = Date.now();
  return `usuario_${timestamp}@yopmail.com`;
}

export function generarDNI() {
  return Math.floor(Math.random() * 90000000) + 10000000; // 8 dígitos
}