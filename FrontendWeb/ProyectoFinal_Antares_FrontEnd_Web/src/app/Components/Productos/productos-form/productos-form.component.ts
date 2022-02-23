import { Component, OnInit } from '@angular/core';
import {Producto} from "../../../Models/producto";
import {ProductosService} from "../../../Services/productos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {imagenProducto} from "../../../Models/imagenProducto";
import {first} from "rxjs";

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit {

  imageSrc: string = '';
  producto: Producto;
  id: number;
  isAddMode: boolean;
  browserForm: FormGroup;

  titulo: string = "Agregar producto";

  constructor(public productoService: ProductosService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.initForm();

    if (!this.isAddMode) {
      this.productoService.findOne(this.id)
        .pipe(first())
        .subscribe(x => this.browserForm.patchValue(x));
    }
  }

  get f(){
    return this.browserForm.controls;
  }

  private initForm(): void{
    this.browserForm = this.fb.group({
      id: 0,
      descripcion: '',
      stock: 0,
      activo: true,
      nota: '',
      precio: 0,
      base64Image: ''
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
        base64Image: this.imageSrc
      },
      precio: this.browserForm.value.precio
    }

    if (this.isAddMode) {
      await this.productoService.agregarProducto(this.producto).subscribe(_ => this.router.navigate(['/productos']));
    } else {
      await this.productoService.editarProducto(this.producto).subscribe(_ => this.router.navigate(['/productos']));
    }
  }

  onFileChange(event:any) {

    const reader = new FileReader();



    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.browserForm.patchValue({
          base64Image: reader.result
        });
      };
    }
  }

  async regresar(): Promise<void> {
    await this.router.navigate(['/productos'])
  }
}
