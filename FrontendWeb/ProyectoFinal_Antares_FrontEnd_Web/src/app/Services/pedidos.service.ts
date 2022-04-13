import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pedido} from "../Models/pedido";
import {Producto} from "../Models/producto";
import {Usuario} from "../Models/usuario";

@Injectable({
  providedIn: 'root'
})
export class PedidosService
{
  public requestUrl = 'https://localhost:7001/api/v1/Pedido';
  public requestUrl2 = 'https://localhost:7001/api/v1/Usuario';

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<Pedido[]>(this.requestUrl);
  }

  findOne(id: number)
  {
    return this.http.get<Pedido>(`${this.requestUrl  }/id?id=${id}`);
  }

  getById(id: number)
  {
    return this.http.get(this.requestUrl + '/' + id);
  }

  getDeliveries()
  {
    return this.http.get<Usuario[]>(this.requestUrl2 + '/deliveries');
  }

  cancelarPedido(id: number)
  {
    let params = {
      id: id
    };

    return this.http.post(this.requestUrl + '/CancelarPedido', params);
  }

  cambiarEstado(idPedido: number)
  {
    const params = {
      pedidoId: idPedido
    };

    return this.http.put(this.requestUrl + `/CambiarEstado?pedidoId=${idPedido}`, params);
  }

  cambiarEstadoDelivery(idPedido: number, idDelivery: number)
  {
    const params = {
      pedidoId: idPedido,
      deliveryId: idDelivery
    };

    return this.http.put(this.requestUrl + `/CambiarEstado?pedidoId=${idPedido}&deliveryId=${idDelivery}`, params);
  }
}
