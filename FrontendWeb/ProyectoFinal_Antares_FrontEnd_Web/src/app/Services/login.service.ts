import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Producto} from "../Models/producto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public requestUrl = 'https://localhost:7001/api/v1/Usuario';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
  });

  constructor(private http: HttpClient)
  { }

  validarUsuario(nombre: string, contrasenia: string)
  {
    var params = {
      usuario : nombre,
      contrasenia : contrasenia
    }

    return this.http.post(this.requestUrl + '/token', params, { responseType: 'text' as 'json' } );
  }
}
