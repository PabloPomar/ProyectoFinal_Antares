export interface Usuario
{
    id: number;
    nombreUsuario: string;
    password: string;
    tipo: TipoUsuario;
    dni: number;
    mail: string;
    telefono: string;
}

export enum TipoUsuario
{
    Admin,
    Mozo,
    Delivery,
    Cliente
}

export const TipoUsuarioMapping: Record<string, TipoUsuario> = {
  "Admin" : TipoUsuario.Admin,
  "Mozo" : TipoUsuario.Mozo,
  "Delivery": TipoUsuario.Delivery,
  "Cliente": TipoUsuario.Cliente
};
