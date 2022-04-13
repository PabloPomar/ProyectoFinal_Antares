import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PedidoDialogData} from "../../../Models/PedidoDialogData";
import {EstadoPedido} from "../../../Models/pedido";
import {Usuario} from "../../../Models/usuario";
import {PedidosService} from "../../../Services/pedidos.service";

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss']
})
export class PedidosFormComponent {

  public needsDelivery: boolean = false;

  public idDelivery: number = 0;

  public deliveries: Usuario[] = [];

  displayedColumns: string[] = ['Producto', 'Cantidad','Total'];

  constructor(
    public dialogRef: MatDialogRef<PedidosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PedidoDialogData,
              private pedidosService: PedidosService) {
    {
      this.needsDelivery = data.pedido.estadoPedido === EstadoPedido.Preparando;

      if (this.needsDelivery) {
        this.pedidosService.getDeliveries().subscribe(deliveries => {
          this.deliveries = deliveries;
        });
      }
    }
  }

  evolucionarPedido() {
    this.pedidosService.cambiarEstado(this.data.pedido.id).subscribe(() => {
      alert("Pedido avanzado");
    });

    this.dialogRef.close();
  }

  evolucionarPedidoDelivery() {
    this.pedidosService.cambiarEstadoDelivery(this.data.pedido.id, this.idDelivery).subscribe(() => {
      alert("Pedido avanzado, delivery asignado");
    });

    this.dialogRef.close();
  }

}
