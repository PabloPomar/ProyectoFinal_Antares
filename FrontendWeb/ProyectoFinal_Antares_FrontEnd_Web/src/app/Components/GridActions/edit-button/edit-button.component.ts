import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-button',
    templateUrl: './edit-button.component.html',
    styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements ICellRendererAngularComp
{
    private params: any;

    constructor(private router: Router)
    {
    }

    agInit(params: any): void
    {
        this.params = params;
    }

    async btnClickedHandler()
    {
        await this.router.navigate([this.params.route + this.params.value]);
    }

    refresh(params: ICellRendererParams): boolean
    {
        return false;
    }
}