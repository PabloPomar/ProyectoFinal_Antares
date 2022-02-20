import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Producto} from "../Models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public requestUrl = 'https://localhost:7001/api/v1/Producto'

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<Producto[]>(this.requestUrl);
  }

  findOne(id: number)
  {
    return this.http.get<Producto[]>(this.requestUrl + '/id?id=' + id);
  }

  agregarProducto(producto: Producto, params: HttpParams = new HttpParams())
  {
    return this.http.post<Producto>(this.requestUrl, producto);
  }

  editarProducto(producto: Producto)
  {
    return this.http.put<Producto>(this.requestUrl, JSON.stringify(producto));
  }

  borrarProducto(id: number)
  {
    return this.http.delete(this.requestUrl + '/' + id);
  }
}
