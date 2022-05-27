import jwtDecode from "jwt-decode";

export function getUserFromToken(token) {
  let data = jwtDecode(token);
  return data.userName;
}

export const statusColors = {
  Pagado: {color: "red", progress: 20 / 100},
  Preparando: { color: "red", progress: 40 / 100 },
  EnCamino: { color: "yellow", progress: 70 / 100 },
  Entregado: { color: "green", progress: 100 / 100 },
  Finalizado: { color: "green", progress: 100 / 100 },
};
