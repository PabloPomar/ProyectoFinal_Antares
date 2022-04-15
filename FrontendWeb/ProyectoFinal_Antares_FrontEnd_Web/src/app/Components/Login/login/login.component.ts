import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../Services/login.service";
import jwtDecode from "jwt-decode";
import {TipoUsuario} from "../../../Models/usuario";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user: string;
  password: string;
  userName: string;
  userType: string;
  isLogged: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  constructor(public loginService: LoginService, private fb: FormBuilder, private router: Router) {
  }

  login() {
    this.user = this.userForm.value.user;
    this.password = this.userForm.value.password;
    this.loginService.validarUsuario(this.user, this.password).subscribe((data: any) => {
      if (data !== false) {
        this.checkToken();
        this.router.navigate(['/pedidos']);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });

  }

  private initForm(): void{
    this.userForm = this.fb.group({
      user: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
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
