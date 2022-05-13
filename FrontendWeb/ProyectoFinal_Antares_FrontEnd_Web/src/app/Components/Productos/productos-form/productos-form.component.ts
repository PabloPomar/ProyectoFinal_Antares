import {Component, OnInit} from '@angular/core';
import {Producto, TipoProducto} from '../../../Models/producto';
import {ProductosService} from '../../../Services/productos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs';
import Swal from "sweetalert2";

@Component({
    selector: 'app-productos-form',
    templateUrl: './productos-form.component.html',
    styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit
{
    imageSrc: string = '';
    producto: Producto;
    id: number;
    idView: number;
    isAddMode: boolean;
    isViewMode: boolean;
    browserForm: FormGroup;
    esBebida: TipoProducto = TipoProducto.BebidaAlcoholica;
    nombreOriginal: string;
    productoExiste: boolean = false;

    titulo: string = 'Agregar producto';

    constructor(public productoService: ProductosService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder)
    { }

    ngOnInit(): void
    {
        this.id = this.route.snapshot.params['id'];
        this.idView = this.route.snapshot.params['idView'];

        if (this.idView !== undefined)
        {
            this.isViewMode = true;
            this.titulo = "Detalle producto"
            this.id = this.idView;
        }

        this.isAddMode = !this.id;

        this.initForm();

        if (!this.isAddMode)
        {
          this.titulo = "Editar producto"
            this.productoService.findOne(this.id)
                .pipe(first())
                .subscribe(x =>
                {
                  this.browserForm.patchValue(x);
                  this.imageSrc = x.imagen.base64Image;
                  this.nombreOriginal = x.nombre;
                } );
        }

        if(this.isViewMode)
          this.titulo = "Detalle producto"
    }

    get f()
    {
        return this.browserForm.controls;
    }

    private initForm(): void
    {
        this.browserForm = this.fb.group({
            id: 0,
            tipoProducto: new FormControl({ value: TipoProducto.BebidaAlcoholica, disabled: this.isViewMode }, [
              Validators.required
            ]),
            nombre: new FormControl({ value: '', disabled: this.isViewMode }, [
              Validators.required
            ]),
            subtitulo: new FormControl({ value: '', disabled: this.isViewMode }),
            descripcion: new FormControl({ value: '', disabled: this.isViewMode }, [
              Validators.required
            ]),
            stock: new FormControl({ value: 0, disabled: this.isViewMode }, [
              Validators.required,
              Validators.min(0)
            ]),
            activo: true,
            nota: new FormControl({ value: '', disabled: this.isViewMode }, [
              Validators.required
            ]),
            precio: new FormControl({ value: 0, disabled: this.isViewMode }, [
              Validators.required,
              Validators.min(1)
            ]),
            porcentageAlcohol: new FormControl({ value: null, disabled: this.isViewMode }),
            base64Image: new FormControl({ value: '', disabled: this.isViewMode })
        });
    }

    async onSubmit(): Promise<void>
    {
        this.producto = {
            id: this.browserForm.value.id,
            nombre: this.browserForm.value.nombre,
            subtitulo: this.browserForm.value.subtitulo,
            descripcion: this.browserForm.value.descripcion,
            stock: this.browserForm.value.stock,
            activo: true,
            nota: this.browserForm.value.nota,
            imagen: {
                id: 0,
                base64Image: this.imageSrc
            },
            precio: this.browserForm.value.precio,
            porcentageAlcohol: this.browserForm.value.porcentageAlcohol,
            tipoProducto: this.browserForm.value.tipoProducto
        };
          if (this.isAddMode)
          {
            this.productoService.validarNombre(this.producto.nombre).subscribe(async x => {
              if (x)
              {
                await Swal.fire(`El producto con nombre ${this.producto.nombre} se encuentra en uso. Utilize otro nombre.`);
              }
              else
                await this.productoService.create(this.producto).subscribe(_ => this.router.navigate(['/productos']));
            });
          }
          else
          {
            this.productoService.validarNombreEdit(this.producto.nombre, this.nombreOriginal).subscribe(async x => {
                if (x) {
                  await Swal.fire(`El producto con nombre ${this.producto.nombre} se encuentra en uso. Utilize otro nombre.`);
                } else {
                  await this.productoService.edit(this.producto).subscribe(_ => this.router.navigate(['/productos']));
                }
              }
            );
          }
    }

    onFileChange(event:any)
    {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length)
        {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () =>
            {
                this.imageSrc = reader.result as string;
                this.browserForm.patchValue({
                    base64Image: reader.result
                });
            };
        }
    }

  isValidField(field: string): boolean {
    const validatedField = this.browserForm.get(field);
    if(!validatedField.touched)
      return true;

    return (validatedField.valid);
  }

  async regresar(): Promise<void>
  {
      await this.router.navigate(['/productos']);
  }
}
