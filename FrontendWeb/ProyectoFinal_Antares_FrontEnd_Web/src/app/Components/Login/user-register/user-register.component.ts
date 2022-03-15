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

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  confirmPassword: string;
  usuario: Usuario = { id: 0, nombreUsuario:'', dni:null, telefono:'', password:'', mail:'', tipo: TipoUsuario.Cliente };

  ngOnInit(): void {
    this.initForm();
  }

  constructor(public loginService: LoginService, private fb: FormBuilder) {
  }

  register() {
    this.usuario.nombreUsuario = this.userRegisterForm.value.nombreUsuario;
    this.usuario.dni = this.userRegisterForm.value.dni;
    this.usuario.telefono = this.userRegisterForm.value.telefono;
    this.usuario.password = this.userRegisterForm.value.password;
    this.usuario.mail = this.userRegisterForm.value.mail;
    this.usuario.tipo = this.userRegisterForm.value.tipo;
    this.loginService.registrarUsuario(this.usuario).subscribe(result => console.log(result) );
  }

  private initForm(): void{
    this.userRegisterForm = this.fb.group({
      id: new FormControl(0),
      nombreUsuario: new FormControl('', [
        Validators.required
      ]),
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
