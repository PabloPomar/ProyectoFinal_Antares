import { Component, OnInit } from '@angular/core';
import {Producto} from "../../../Models/producto";
import {ProductosService} from "../../../Services/productos.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {imagenProducto} from "../../../Models/imagenProducto";

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit {

  constructor(public productoService: ProductosService,
              private router: Router,
              private fb: FormBuilder) { }

  producto: Producto;

  browserForm: FormGroup;

  titulo: string = "Agregar producto";

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this.browserForm = this.fb.group({
      id: 0,
      descripcion: '',
      stock: 0,
      activo: true,
      nota: '',
      precio: 0
    });
  }

  async onSubmit(): Promise<void> {
    this.producto = {
      id: this.browserForm.value.id,
      descripcion: this.browserForm.value.descripcion,
      stock: this.browserForm.value.stock,
      activo: true,
      nota: this.browserForm.value.nota,
      imagen: {
        id: 0,
        base64Image: ''
      },
      precio: this.browserForm.value.precio
    }

    await this.productoService.agregarProducto(this.producto).subscribe(_ => this.router.navigate(['/productos']));
  }

  async regresar(): Promise<void> {
    await this.router.navigate(['/productos'])
  }
}
