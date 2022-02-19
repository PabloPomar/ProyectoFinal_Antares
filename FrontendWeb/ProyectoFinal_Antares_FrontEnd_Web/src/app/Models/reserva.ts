import {Mesa} from "./mesa";
import {Usuario} from "./usuario";

export interface Reserva
{
  id: number;
  usuario: Usuario;
  mesa: Mesa;
  cantidadComensales: number;
  hora: string;
  clave: string;
}
