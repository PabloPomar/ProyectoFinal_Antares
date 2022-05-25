import { imagenProducto } from './imagenProducto';

export interface Producto
{
    id: number;
    nombre: string;
    subtitulo: string;
    descripcion: string;
    stock: number;
    activo: boolean;
    nota: string;
    imagen: imagenProducto;
    precio: number;
    porcentageAlcohol : number;
    tipoProducto : TipoProducto;
}


export enum TipoProducto
{
  Cerveza,
  BebidaNoAlcoholica,
  Minuta,
  Pizza,
  Postre,
  ServicioDelivery
}
