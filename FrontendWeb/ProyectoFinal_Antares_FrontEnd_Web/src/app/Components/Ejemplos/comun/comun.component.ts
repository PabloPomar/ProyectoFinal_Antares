import { Component, OnInit } from '@angular/core';
import {ComunService} from "../../../Services/Ejemplo/comun.service";
import {Turno} from "../../../Models/turno";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";

@Component({
  selector: 'app-comun',
  templateUrl: './comun.component.html',
  styleUrls: ['./comun.component.scss']
})
export class ComunComponent implements OnInit {

  modules = [ClientSideRowModelModule];

  constructor(public comunService: ComunService) { }

  turnos: Turno[] = [];

  columnDefs = [
    { field: 'id', filter: true },
    { field: 'descripcion' , sortable: true},
  ];

  ngOnInit(): void {
  }

  getAllTurnos()
  {
    this.comunService.getConfig().subscribe((data: Turno[]) => this.turnos = data);
  }
}
