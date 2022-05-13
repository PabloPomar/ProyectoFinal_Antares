import {Component, OnInit} from '@angular/core';
import {TipoReporte} from "../../../Models/Reportes/tipoReporte";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  constructor() { }

  public tipoReporte: TipoReporte = TipoReporte.ninguno;

  public reporteSeleccionado: TipoReporte = TipoReporte.ninguno;

  ngOnInit(): void {
  }

  reportSeleccionado(){
    this.reporteSeleccionado = this.tipoReporte;
  }

}
