import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../Services/report.service";
import {ventasDto} from "../../../Models/Reportes/ventasDto";
import {Meses} from "../../../Models/meses";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {CsvExportModule} from "@ag-grid-community/csv-export";

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.scss']
})
export class ReporteVentasComponent implements OnInit {

  modules = [ClientSideRowModelModule, CsvExportModule];

  public api: any;

  public rowHeight: number;

  public columnApi: any;

  context: any;

  public reporteVentas: ventasDto[] = [];

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.reportService.getVentasReporte().subscribe(data => {
      this.reporteVentas = data;
    });
  }

  columnDefs = [
    {headerName: 'Mes', field: 'salesMonth', sortable: true, filter: true, cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: Meses }) => {
        return (data.value !== null && data.value !== undefined)
          ? Meses[data.value] : 'not found';}},
    {headerName: 'Año', field: 'salesYear', sortable: true, filter: true, cellStyle: {fontSize: '20px'}},
    {headerName: 'Ventas', field: 'totalSales', cellStyle: {fontSize: '20px'}, valueFormatter: (params: { data: { totalSales: any; }; }) => this.currencyFormatter(params, '$'), sortable: true},
    {headerName: 'Completadas', field: 'completadas', sortable: true, cellStyle: {fontSize: '20px'}},
    {headerName: 'No Completadas', field: 'noCompletadas', sortable: true, cellStyle: {fontSize: '20px'}},
  ];

  currencyFormatter(params: any, sign: any) {
    var sansDec = params.data.totalSales.toFixed(2);
    return sign + `${sansDec}`;
  }

  onGridReady = (params: any) =>
  {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  };

  public gridOptions = {
    rowData: this.reporteVentas,
    columnDefs: this.columnDefs,
    pagination: true,
    rowSelection: 'single'
  };

  onBtnExport() {
    this.api.exportDataAsCsv();
  }
}
