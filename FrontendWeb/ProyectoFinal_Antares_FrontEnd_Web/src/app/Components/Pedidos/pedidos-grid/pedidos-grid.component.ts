import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PedidosService} from "../../../Services/pedidos.service";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {EstadoPedido, Pedido} from "../../../Models/pedido";

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

  constructor(public pedidosService: PedidosService,
              private router: Router) {
    this.context = {
      componentParent: this
    };
    this.rowHeight = 50;
  }

  ngOnInit(): void
  {
    this.pedidosService.getAll().subscribe((data: Pedido[]) => this.pedidos = data);
  }

  columnDefs = [
    { headerName: 'id', field: 'id', filter: true, cellStyle: {fontSize: '20px'}, maxWidth: 40},
    { headerName: 'usuario', field: 'usuario.nombreUsuario', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'delivery', field: 'delivery.nombreUsuario', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'horaPedido', field: 'horaPedido', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'horaEntrega', field: 'horaEntrega', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
    { headerName: 'precioTotal', field: 'precioTotal', valueFormatter: (params: { data: { precio: any; }; }) => this.currencyFormatter(params, '$'),
      sortable: true , cellStyle: {fontSize: '20px'}, type: 'rightAligned'},
    { headerName: 'Estado', field: 'estadoPedido', filter: true, sortable: true , cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: EstadoPedido }) => {
        return (data.value !== null && data.value !== undefined)
          ? EstadoPedido[data.value] : 'not found';}}
  ];

  currencyFormatter(params: any, sign: any) {
    var sansDec = params.data.precio.toFixed(2);
    return sign + `${sansDec}`;
  }

  onGridReady = (params: any) =>
  {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  };

  public gridOptions = {
    rowData: this.pedidos,
    columnDefs: this.columnDefs,
    pagination: true,
    rowSelection: 'single',
  };
}
