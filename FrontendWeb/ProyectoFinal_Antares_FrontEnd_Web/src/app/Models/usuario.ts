export interface Usuario
{
    id: number;
    nombreUsuario: string;
    password: string;
    tipo: TipoUsuario;
    dni: number;
    mail: string;
    direccion: string;
    telefono: string;
}

export enum TipoUsuario
{
    Admin = 0,
    Mozo = 1,
    Delivery = 2,
    Cliente = 3
}

export const TipoUsuarioMapping: Record<string, TipoUsuario> = {
  "Admin" : TipoUsuario.Admin,
  "Mozo" : TipoUsuario.Mozo,
  "Delivery": TipoUsuario.Delivery,
  "Cliente": TipoUsuario.Cliente
};
