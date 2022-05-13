import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import {ICellRendererParams} from "@ag-grid-community/core";

@Component({
  selector: 'app-abrir-pedido',
  templateUrl: './abrir-pedido.component.html',
  styleUrls: ['./abrir-pedido.component.scss']
})
export class AbrirPedidoComponent implements ICellRendererAngularComp {

  componentParent: any;
  private params: any;
  public isActive: boolean = false;

  agInit(params: any): void
  {
    this.params = params;
    this.componentParent = this.params.context.componentParent;
    this.isActive = (this.params.data.estadoPedido !== 5 && this.params.data.estadoPedido !== 6);
  }

  constructor() { }

  async btnClickedHandler()
  {
    await this.componentParent.openDialog(this.params.value as number);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

}
