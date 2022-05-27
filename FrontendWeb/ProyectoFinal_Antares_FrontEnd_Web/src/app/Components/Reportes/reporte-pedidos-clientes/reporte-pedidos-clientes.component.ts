import { Component, OnInit } from '@angular/core';
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ReportService} from "../../../Services/report.service";
import {Meses} from "../../../Models/meses";
import {pedidosClientesDto} from "../../../Models/Reportes/pedidosClientesDto";
import {GridApi, ModuleRegistry} from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import {AG_GRID_LOCALE_ES} from "../../../Models/traduccion";

@Component({
  selector: 'app-reporte-pedidos-clientes',
  templateUrl: './reporte-pedidos-clientes.component.html',
  styleUrls: ['./reporte-pedidos-clientes.component.scss']
})
export class ReportePedidosClientesComponent implements OnInit {

  modules = [ClientSideRowModelModule, CsvExportModule];

  public api: GridApi;

  public rowHeight: number;

  public columnApi: any;

  context: any;

  public reportePedidoCliente: pedidosClientesDto[] = [];

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.reportService.getClientesReporte().subscribe(data => {
      this.reportePedidoCliente = data;
    });
  }

  columnDefs = [
    {headerName: 'Mes', field: 'salesMonth', sortable: true, filter: true, cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: Meses }) => {
        return (data.value !== null && data.value !== undefined)
          ? Meses[data.value] : 'not found';}},
    {headerName: 'Año', field: 'salesYear', sortable: true, filter: true, cellStyle: {fontSize: '20px'}},
    {headerName: 'Número de cliente', field: 'idUsuario', sortable: true, filter: true, cellStyle: {fontSize: '20px'}},
    {headerName: 'Nombre', field: 'nombre', sortable: true, filter: true, cellStyle: {fontSize: '20px'}},
    {headerName: 'Completadas', field: 'completadas', sortable: true, filter: true, cellStyle: {fontSize: '20px'}},
    {headerName: 'Canceladas', field: 'canceladas', sortable: true, filter: true, cellStyle: {fontSize: '20px'}},
  ];

  onGridReady = (params: any) =>
  {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  };

  public gridOptions = {
    rowData: this.reportePedidoCliente,
    columnDefs: this.columnDefs,
    pagination: true,
    rowSelection: 'single',
    localeText: AG_GRID_LOCALE_ES
  };

  onBtnExport() {
    this.api.exportDataAsCsv();
  }
}

