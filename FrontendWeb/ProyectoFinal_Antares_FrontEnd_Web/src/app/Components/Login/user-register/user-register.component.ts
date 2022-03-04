import {Component} from '@angular/core';
import {TipoUsuario, Usuario} from "../../../Models/usuario";
import {LoginService} from "../../../Services/login.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  confirmPassword: string;
  usuario: Usuario = { id: 0, nombreUsuario:'', dni:null, telefono:'', password:'', mail:'', tipo: TipoUsuario.Cliente };

  constructor(public loginService: LoginService) {
  }

  register() {
    this.loginService.registrarUsuario(this.usuario).subscribe(result => console.log(this.loginService.getLoggedUser) );
  }
}
