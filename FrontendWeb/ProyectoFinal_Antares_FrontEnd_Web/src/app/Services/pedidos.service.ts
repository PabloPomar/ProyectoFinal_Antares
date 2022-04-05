import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pedido} from "../Models/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidosService
{
  public requestUrl = 'https://localhost:7001/api/v1/Pedido';

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<Pedido[]>(this.requestUrl);
  }

  getById(id: number)
  {
    return this.http.get(this.requestUrl + '/' + id);
  }
}
