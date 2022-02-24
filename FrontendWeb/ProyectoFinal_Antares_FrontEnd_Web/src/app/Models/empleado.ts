export interface Empleado
{
    id: number;
    nombre: string;
    dni: string;
    activo: boolean;
    tipo: TipoEmpleado;
}

export enum TipoEmpleado{
    Administrador,
    Gerente,
    Mozo,
    Cajero,
    Barman
}
