import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../Services/login.service";
import jwtDecode from "jwt-decode";
import {TipoUsuario} from "../../../Models/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: string;
  password: string;
  userName: string;
  userType: string;
  isLogged: boolean = false;

  constructor(public loginService: LoginService) {}

  login() {
    this.loginService.validarUsuario(this.user, this.password).subscribe((data: any) => {
      if (data != null)
        this.checkToken()
    });
  }

  checkToken() {
    let token = localStorage.getItem('loggedInUser');
    const tokenInfo = this.getDecodedAccessToken(token);
    const expireDate = tokenInfo.exp;
    this.userName = tokenInfo.userName;
    this.userType = tokenInfo.userType;
    this.isLogged = true;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

}
