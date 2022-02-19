import {Usuario} from "./usuario";
import {PedidoProducto} from "./pedidoProducto";

export interface Pedido
{
  id: number;
  usuario: Usuario;
  estadoPedido: EstadoPedido;
  listaPedido: PedidoProducto[];
  precioTotal: number;
  nota: string;
}

export enum EstadoPedido
{
  Creado,
  Pagado,
  Preparando,
  EnCamino,
  Entregado,
  Finalizado
}
