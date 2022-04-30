import { Component, OnInit } from '@angular/core';
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ventasDto} from "../../../Models/Reportes/ventasDto";
import {ReportService} from "../../../Services/report.service";
import {Meses} from "../../../Models/meses";
import {AbrirPedidoComponent} from "../../GridActions/abrir-pedido/abrir-pedido.component";
import {CancelarPedidoComponent} from "../../GridActions/cancelar-pedido/cancelar-pedido.component";
import {deliveriesDto} from "../../../Models/Reportes/deliveriesDto";
import {CsvExportModule} from "@ag-grid-community/csv-export";

@Component({
  selector: 'app-reporte-deliveries',
  templateUrl: './reporte-deliveries.component.html',
  styleUrls: ['./reporte-deliveries.component.scss']
})
export class ReporteDeliveriesComponent implements OnInit {

  modules = [ClientSideRowModelModule, CsvExportModule];

  public api: any;

  public rowHeight: number;

  public columnApi: any;

  context: any;

  public reporteDeliveries: deliveriesDto[] = [];

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.reportService.getDeliveriesReporte().subscribe(data => {
      this.reporteDeliveries = data;
    });
  }

  columnDefs = [
    {headerName: 'Mes', field: 'salesMonth', sortable: true, filter: true, cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: Meses }) => {
        return (data.value !== null && data.value !== undefined)
          ? Meses[data.value] : 'not found';}},
    {headerName: 'Año', field: 'salesYear', sortable: true, filter: true},
    {headerName: 'Id', field: 'idDelivery', sortable: true, filter: true},
    {headerName: 'Nombre', field: 'nombre', sortable: true, filter: true},
    {headerName: 'Completadas', field: 'completadas', sortable: true, filter: true},
    {headerName: 'No Completadas', field: 'noCompletadas', sortable: true, filter: true},
  ];

  onGridReady = (params: any) =>
  {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  };

  public gridOptions = {
    rowData: this.reporteDeliveries,
    columnDefs: this.columnDefs,
    pagination: true,
    rowSelection: 'single'
  };

  onBtnExport() {
    this.api.exportDataAsCsv();
  }
}
