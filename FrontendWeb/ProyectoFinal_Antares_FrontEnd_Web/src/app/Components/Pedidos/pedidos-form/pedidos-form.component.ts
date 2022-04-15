import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PedidoDialogData} from "../../../Models/PedidoDialogData";
import {EstadoPedido} from "../../../Models/pedido";
import {Usuario} from "../../../Models/usuario";
import {PedidosService} from "../../../Services/pedidos.service";
import {formatDate} from "@angular/common";
import jwtDecode from "jwt-decode";

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
    return formatDate(date, 'YYYY/MM/dd HH:MM', 'en-US');
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

  checkToken() {
    let token = localStorage.getItem('loggedInUser');
    if(token == null)
      return false;
    const tokenInfo = this.getDecodedAccessToken(token);
    console.log(tokenInfo);
    const expireDate = tokenInfo.exp;
    this.userId = tokenInfo.userId;
    this.userType = tokenInfo.userType;
    this.isAdmin = this.userType === "Admin";
    this.isLogged = true;

    console.log(this.userId);
    console.log(this.userType);
    console.log(this.isAdmin);
    console.log(this.isLogged);

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
    if(this.isAdmin)
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.Pagado && this.userType == "Caja")
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.Preparando && this.userType == "Caja")
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.EnCamino && this.userType == "Delivery" && this.data.pedido.delivery.id == this.userId)
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.Entregado && this.userType == "Caja")
      return true;
    if(this.data.pedido.estadoPedido == EstadoPedido.Finalizado)
      return false;
    if(this.data.pedido.estadoPedido == EstadoPedido.Cancelado)
      return false;

    return false;
  }

}
