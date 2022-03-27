import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Producto} from "../Models/producto";
import {Usuario} from "../Models/usuario";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public requestUrl = 'https://localhost:7001/api/v1/Usuario';
  private loggedUserSubject: BehaviorSubject<Usuario>;
  public loggedInUser: Observable<any>;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json'
  });
  public getLoggedUser: Usuario;

  constructor(private http: HttpClient)
  {
    let getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser);
    this.loggedInUser = this.loggedUserSubject.asObservable();
  }

  validarUsuario(nombre: string, contrasenia: string)
  {
    var params = {
      usuario : nombre,
      contrasenia : contrasenia
    }

    return this.http.post(this.requestUrl + '/token', params, { responseType: 'text' as 'json' } )
      .pipe(map(response=> {
      localStorage.setItem('loggedInUser', JSON.stringify(response));
      this.loggedUserSubject.next(<Usuario>response);
      return response;
    }));
  }

  registrarUsuario(usuario: Usuario)
  {
    return this.http.post(this.requestUrl, usuario );
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.loggedUserSubject.next(null);
  }

  validarNombre(nombre: string)
  {
    return this.http.get<boolean>(`${this.requestUrl}/ValidarNombre?nombre=${nombre}`);
  }

  validarMail(mail: string)
  {
    return this.http.get<boolean>(`${this.requestUrl}/ValidarMail?email=${mail}`);
  }

  public get loggedInUserValue(){
    return this.loggedUserSubject.value;
  }
}
