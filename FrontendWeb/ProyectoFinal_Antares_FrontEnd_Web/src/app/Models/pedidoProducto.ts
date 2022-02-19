import {Producto} from "./producto";

export interface PedidoProducto
{
  id: number;
  producto: Producto;
  cantidad: number;
}
