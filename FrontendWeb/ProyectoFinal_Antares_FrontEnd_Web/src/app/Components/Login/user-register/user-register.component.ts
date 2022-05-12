import {Component, OnInit} from '@angular/core';
import {TipoUsuario, Usuario} from "../../../Models/usuario";
import {LoginService} from "../../../Services/login.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  confirmPassword: string;
  siteKey: any = "";
  usuario: Usuario = { id: 0, nombreUsuario:'', direccion: '', dni:null, telefono:'', password:'', mail:'', tipo: TipoUsuario.Cliente };
  captchaResolved: boolean = false;

  ngOnInit(): void {
    this.initForm();
    //Antares Proyecto UTN
    this.siteKey = "6LfFsxwfAAAAADfIFGrQR0ZDVH0BMa0pruDFkRbC";
  }

  constructor(public loginService: LoginService, private fb: FormBuilder,
              private router: Router) {
  }

  register() {
    this.usuario.nombreUsuario = this.userRegisterForm.value.nombreUsuario;
    this.usuario.direccion = this.userRegisterForm.value.direccion;
    this.usuario.dni = this.userRegisterForm.value.dni;
    this.usuario.telefono = this.userRegisterForm.value.telefono;
    this.usuario.password = this.userRegisterForm.value.password;
    this.usuario.mail = this.userRegisterForm.value.mail;
    this.usuario.tipo = this.userRegisterForm.value.tipo;

    this.loginService.validarMail(this.usuario.mail).subscribe(x =>
      {
        if(x)
        {
          Swal.fire("El mail del usuario se encuentra en uso");
        }
          this.loginService.validarNombre(this.usuario.nombreUsuario).subscribe(async y => {
              if (y) {
                Swal.fire("El nombre del usuario se encuentra en uso");
              } else {
                await this.loginService.registrarUsuario(this.usuario).subscribe(result => alert("Usuario Creado"));
                await this.router.navigate(['/login']);
              }
            }

          )

      }

    )
  }

  resolved(captchaResponse: string) {
    this.captchaResolved = true;
  }

  private initForm(): void{
    this.userRegisterForm = this.fb.group({
      id: new FormControl(0),
      nombreUsuario: new FormControl('', [
        Validators.required
      ]),
      direccion: new FormControl(''),
      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      telefono: new FormControl(null),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ]),
      mail: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ]),
      tipo: new FormControl(TipoUsuario.Cliente)
    }, { validators: this.checkPasswords });
  }

   isValidField(field: string): boolean {
    const validatedField = this.userRegisterForm.get(field);
    if(!validatedField.touched)
      return true;

    return (validatedField.valid);
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }
}
