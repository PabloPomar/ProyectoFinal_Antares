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
  Admin,
  Mozo,
  Delivery,
  Cliente,
  Caja
}

export const TipoUsuarioMapping: Record<string, TipoUsuario> = {
  "Admin" : TipoUsuario.Admin,
  "Mozo" : TipoUsuario.Mozo,
  "Delivery": TipoUsuario.Delivery,
  "Cliente": TipoUsuario.Cliente,
  "Caja": TipoUsuario.Caja
};
