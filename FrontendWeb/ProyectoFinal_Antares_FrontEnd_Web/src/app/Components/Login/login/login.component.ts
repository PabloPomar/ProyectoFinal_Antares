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

  constructor(public loginService: LoginService) {}

  login() {
    this.loginService.validarUsuario(this.user, this.password).subscribe(result => console.log(result));
  }

  checkToken(){
    let token = localStorage.getItem('loggedInUser');
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    const expireDate = tokenInfo.exp; // get token expiration dateTime
    console.log(tokenInfo); // show decoded token object in console
    console.log(tokenInfo.userId);
    console.log(tokenInfo.userName);
    console.log(tokenInfo.userType);

    if(tokenInfo.userType == "Admin")
      console.log("True");
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

}
