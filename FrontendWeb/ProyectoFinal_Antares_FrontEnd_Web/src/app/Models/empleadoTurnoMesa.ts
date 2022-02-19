import {EmpleadoTurno} from "./empleadoTurno";
import {Mesa} from "./mesa";

export interface EmpleadoTurnoMesa
{
  empleadoTurno: EmpleadoTurno;
  mesa: Mesa;
  activo: boolean;
}
