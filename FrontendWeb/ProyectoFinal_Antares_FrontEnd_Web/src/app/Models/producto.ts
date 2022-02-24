import { imagenProducto } from './imagenProducto';

export interface Producto
{
    id: number;
    descripcion: string;
    stock: number;
    activo: boolean;
    nota: string;
    imagen: imagenProducto;
    precio: number;
}
