import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PedidosService} from "../../../Services/pedidos.service";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {EstadoPedido, Pedido} from "../../../Models/pedido";
import {MatDialog} from "@angular/material/dialog";
import {PedidosFormComponent} from "../pedidos-form/pedidos-form.component";
import {AbrirPedidoComponent} from "../../GridActions/abrir-pedido/abrir-pedido.component";
import {CancelarPedidoComponent} from "../../GridActions/cancelar-pedido/cancelar-pedido.component";

@Component({
  selector: 'app-pedidos-grid',
  templateUrl: './pedidos-grid.component.html',
  styleUrls: ['./pedidos-grid.component.scss']
})
export class PedidosGridComponent implements OnInit
{
  modules = [ClientSideRowModelModule];

  public api: any;

  public rowHeight: number;

  public columnApi: any;

  context: any;

  pedidos: Pedido[] = [];

  pedidoFocus: Pedido;

  constructor(public pedidosService: PedidosService,
              private router: Router,
              public dialog: MatDialog) {
    this.context = {
      componentParent: this
    };
    this.rowHeight = 50;
  }

  ngOnInit(): void
  {
    this.pedidosService.getAll().subscribe((data: Pedido[]) =>{
      this.pedidos = data
    } );
  }

  openDialog(id: number): void {
    this.pedidosService.findOne(id).subscribe( x => {
        this.pedidoFocus = x;
        this.dialog.open(PedidosFormComponent, {
          width: '1000px',
          data:  {pedido: this.pedidoFocus},
        });
    })
  }

  columnDefs = [
    { headerName: 'id', field: 'id', filter: true, cellStyle: {fontSize: '20px'}, maxWidth: 40},
    { headerName: 'usuario', field: 'usuario.nombreUsuario', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'horaPedido', field: 'horaPedido', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'horaEntrega', field: 'horaEntrega', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'precioTotal', field: 'precioTotal', valueFormatter: (params: { data: { precioTotal: any; }; }) => this.currencyFormatter(params, '$'),
      sortable: true , cellStyle: {fontSize: '20px'}, type: 'rightAligned'},
    { headerName: 'Estado', field: 'estadoPedido', filter: true, sortable: true , cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: EstadoPedido }) => {
        return (data.value !== null && data.value !== undefined)
          ? EstadoPedido[data.value] : 'not found';}},
    {
      headerName: '',
      field: 'id',
      cellRenderer: 'abrirPedidoComponent',
      cellRendererParams: { },
      maxWidth: 75
    },
    {
      headerName: '',
      field: 'id',
      cellRenderer: 'cancelarPedidoComponent',
      cellRendererParams: {},
      maxWidth: 75
    }
  ];

  currencyFormatter(params: any, sign: any) {
    var sansDec = params.data.precioTotal.toFixed(2);
    return sign + `${sansDec}`;
  }

  onGridReady = (params: any) =>
  {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  };

  public async cancelar(id: number): Promise<void>
  {
    await this.pedidosService.cancelarPedido(id).subscribe(_ => window.location.reload());
  }

  public gridOptions = {
    rowData: this.pedidos,
    columnDefs: this.columnDefs,
    pagination: true,
    rowSelection: 'single',
    components: {
      abrirPedidoComponent: AbrirPedidoComponent,
      cancelarPedidoComponent: CancelarPedidoComponent
    }
  };
}
