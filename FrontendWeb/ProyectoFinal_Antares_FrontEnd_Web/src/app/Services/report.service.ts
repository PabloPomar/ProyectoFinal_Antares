import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ventasDto} from "../Models/Reportes/ventasDto";
import {deliveriesDto} from "../Models/Reportes/deliveriesDto";
import {pedidosClientesDto} from "../Models/Reportes/pedidosClientesDto";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public requestUrl = 'https://localhost:7001/api/v1/Reporte';

  constructor(private http: HttpClient) { }

  getVentasReporte() {
    return this.http.get<ventasDto[]>(this.requestUrl + '/ventas');
  }

  getDeliveriesReporte() {
    return this.http.get<deliveriesDto[]>(this.requestUrl + '/deliveries');
  }

  getClientesReporte() {
    return this.http.get<pedidosClientesDto[]>(this.requestUrl + '/clientes');
  }
}
