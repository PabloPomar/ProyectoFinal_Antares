import {Empleado} from "./empleado";
import {Turno} from "./turno";

export interface EmpleadoTurno
{
  id: number;
  empleado : Empleado;
  turno: Turno;
  activo: boolean;
}
