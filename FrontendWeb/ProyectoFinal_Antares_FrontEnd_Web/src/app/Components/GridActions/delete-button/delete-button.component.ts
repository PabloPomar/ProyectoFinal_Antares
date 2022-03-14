import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements ICellRendererAngularComp
{
    public faTrash = faTrash;
    componentParent: any;
    private params: any;


    agInit(params: any): void
    {
        this.params = params;
        this.componentParent = this.params.context.componentParent;
    }

    async btnClickedHandler()
    {
        console.log(this.componentParent);
        await this.componentParent.delete(this.params.value as number);
    }

    refresh(params: ICellRendererParams): boolean
    {
        return false;
    }
}
