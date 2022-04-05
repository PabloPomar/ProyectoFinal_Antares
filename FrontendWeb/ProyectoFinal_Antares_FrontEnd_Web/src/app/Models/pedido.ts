import { Usuario } from './usuario';
import { PedidoProducto } from './pedidoProducto';

export interface Pedido
{
    id: number;
    usuario: Usuario;
    delivery: Usuario;
    estadoPedido: EstadoPedido;
    listaPedido: PedidoProducto[];
    precioTotal: number;
    horaPedido: Date;
    horaEntrega: Date;
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
