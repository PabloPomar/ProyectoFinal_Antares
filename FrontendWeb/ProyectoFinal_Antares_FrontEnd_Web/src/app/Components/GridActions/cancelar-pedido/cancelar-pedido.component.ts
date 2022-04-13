import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from "@ag-grid-community/core";
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cancelar-pedido',
  templateUrl: './cancelar-pedido.component.html',
  styleUrls: ['./cancelar-pedido.component.scss']
})
export class CancelarPedidoComponent implements ICellRendererAngularComp {

  public faTrash = faTrash;
  componentParent: any;
  private params: any;
  public isActive: boolean = false;

  agInit(params: any): void
  {
    this.params = params;
    this.componentParent = this.params.context.componentParent;
    this.isActive = (this.params.data.estadoPedido !== 5 && this.params.data.estadoPedido !== 6);
  }

  async btnClickedHandler()
  {
    if(this.isActive)
    {
      if(confirm("¿Esta seguro que cancelar el pedido?")) {
        await this.componentParent.cancelar(this.params.value as number);
      }
    }
  }

  refresh(params: ICellRendererParams): boolean
  {
    return false;
  }
}
