import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../Services/login.service";

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

}
