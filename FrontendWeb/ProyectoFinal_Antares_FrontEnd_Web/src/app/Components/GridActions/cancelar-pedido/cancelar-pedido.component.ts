import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from "@ag-grid-community/core";
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

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
      Swal.fire({
        title: '¿Esta seguro que desea cancelar el pedido?',
        text: "El pedido sera cancelado y no podra ser recuperado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.componentParent.cancelar(this.params.value as number);
          await Swal.fire(
            'Cancelado',
            'El pedido fue cancelado.',
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
