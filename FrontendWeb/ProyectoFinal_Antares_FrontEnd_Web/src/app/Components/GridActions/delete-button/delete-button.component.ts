import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

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
        if(confirm("¿Esta seguro que desea desactivar el producto?")) {
          await this.componentParent.delete(this.params.value as number);
        }
      }
      else
      {
        if(confirm("¿Esta seguro que desea reactivar el producto?")) {
          await this.componentParent.delete(this.params.value as number);
        }
      }
    }

    refresh(params: ICellRendererParams): boolean
    {
        return false;
    }
}
