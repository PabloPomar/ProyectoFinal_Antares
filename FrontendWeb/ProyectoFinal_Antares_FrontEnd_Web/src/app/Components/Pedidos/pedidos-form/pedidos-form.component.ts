import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PedidoDialogData} from "../../../Models/PedidoDialogData";
import {EstadoPedido} from "../../../Models/pedido";
import {Usuario} from "../../../Models/usuario";
import {PedidosService} from "../../../Services/pedidos.service";
import {formatDate} from "@angular/common";
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss']
})
export class PedidosFormComponent {

  public needsDelivery: boolean = false;

  public idDelivery: number = 0;

  public deliveries: Usuario[] = [];

  public isCancelled: boolean = false;

  public canEvolve: boolean = false;

  public estadoPedido: string = "";

  private userId: number;

  private userType: string;

  private isAdmin: boolean = false;

  private isLogged: boolean = false;

  displayedColumns: string[] = ['Producto', 'Cantidad','Total'];

  constructor(
    public dialogRef: MatDialogRef<PedidosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PedidoDialogData,
              private pedidosService: PedidosService) {
    {
      this.needsDelivery = data.pedido.estadoPedido === EstadoPedido.Preparando;

      this.isCancelled = data.pedido.estadoPedido == EstadoPedido.Cancelado;

      this.estadoPedido =  EstadoPedido[data.pedido.estadoPedido];

      this.checkToken();

      this.canEvolve = this.canEvolvePedido();

      if (this.needsDelivery) {
        this.pedidosService.getDeliveries().subscribe(deliveries => {
          this.deliveries = deliveries;
        });
      }
    }
  }

  formatDateVista(date: Date) {
    return formatDate(date, 'HH:MM dd/MM/YYYY', 'en-US');
  }

  get hasDeliverySelected(): boolean {
    return this.idDelivery > 0;
  }

  evolucionarPedido() {
    this.pedidosService.cambiarEstado(this.data.pedido.id).subscribe(() => {
      Swal.fire("El pedido ha sido avanzado a estado " + EstadoPedido[this.data.pedido.estadoPedido + 1])
        .then(() => {
          window.location.reload();
        });
    });

    this.dialogRef.close();
  }

  evolucionarPedidoDelivery() {
    this.pedidosService.cambiarEstadoDelivery(this.data.pedido.id, this.idDelivery).subscribe(() => {
      Swal.fire("El pedido ha sido avanzado a estado " + EstadoPedido[this.data.pedido.estadoPedido + 1] + " y se ha asignado al delivery " + this.idDelivery)
        .then(() => {
          window.location.reload();
        });
    });

    this.dialogRef.close();
  }

  checkToken() {
    let token = localStorage.getItem('loggedInUser');
    if(token == null)
      return false;
    const tokenInfo = this.getDecodedAccessToken(token);
    const expireDate = tokenInfo.exp;
    this.userId = tokenInfo.userId;
    this.userType = tokenInfo.userType;
    this.isAdmin = this.userType === "Admin";
    this.isLogged = true;
    return true;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  canEvolvePedido(){
    if(this.data.pedido.estadoPedido == EstadoPedido.Finalizado)
      return false;
    if(this.data.pedido.estadoPedido == EstadoPedido.Cancelado)
      return false;
    if(this.isAdmin)
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.Pagado && this.userType == "Caja")
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.Preparando && this.userType == "Caja")
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.EnCamino && this.userType == "Delivery" && this.data.pedido.delivery.id == this.userId)
      return true;

    return this.data.pedido.estadoPedido == EstadoPedido.Entregado && this.userType == "Caja";
  }

}
