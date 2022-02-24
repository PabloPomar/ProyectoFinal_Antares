import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../../Services/Ejemplo/comun.service';
import { Turno } from '../../../Models/turno';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
    selector: 'app-comun',
    templateUrl: './comun.component.html',
    styleUrls: ['./comun.component.scss']
})
export class ComunComponent
{
    modules = [ClientSideRowModelModule];

    turnos: Turno[] = [];

    columnDefs = [
        { field: 'id', filter: true },
        { field: 'descripcion', sortable: true }
    ];

    constructor(public comunService: ComunService)
    { }

    getAllTurnos()
    {
        this.comunService.getConfig().subscribe((data: Turno[]) => this.turnos = data);
    }
}
