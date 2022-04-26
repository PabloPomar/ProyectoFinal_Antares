import jwtDecode from "jwt-decode";

export function getUserFromToken(token) {
  let data = jwtDecode(token);
  return data.userName;
}

export const statusColors = {
  Preparando: { color: "red", progress: 20 / 100 },
  "En Camino": { color: "yellow", progress: 60 / 100 },
  Entregado: { color: "green", progress: 100 / 100 },
};
