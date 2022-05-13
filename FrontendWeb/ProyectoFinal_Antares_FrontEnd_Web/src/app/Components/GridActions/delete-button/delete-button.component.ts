import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements ICellRendererAngularComp
{
    public faTrash = faTrash;
    public faRecycle = faRecycle;
    componentParent: any;
    private params: any;
    public isActive: boolean = false;

    agInit(params: any): void
    {
        this.params = params;
        this.componentParent = this.params.context.componentParent;
        this.isActive = this.params.data.activo;
    }

    async btnClickedHandler()
    {
      if(this.isActive)
      {
        Swal.fire({
          title: '¿Esta seguro que desea desactivar el producto?',
          text: "Podra reactivar el producto luego de haberlo eliminado",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Borrar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.componentParent.delete(this.params.value as number);
            await Swal.fire(
              'Desactivado',
              'El producto fue desactivado.',
              'success'
            )
          }
        })
      }
      else
      {
        Swal.fire({
          title: '¿Esta seguro que desea reactivar el producto?',
          text: "El producto podra ser seleccionado para ser vendido",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Reactivar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.componentParent.delete(this.params.value as number);
            await Swal.fire(
              'Reactivado',
              'El producto fue reactivado.',
              'success'
            )
          }
        })
      }
    }

    refresh(params: ICellRendererParams): boolean
    {
        return false;
    }
}
