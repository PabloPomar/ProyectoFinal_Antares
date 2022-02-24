import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import {Router} from "@angular/router";
import {ICellRendererParams} from "@ag-grid-community/core";

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements ICellRendererAngularComp, OnDestroy {
  private params: any;
  componentParent: any;

  agInit(params: any): void {
    this.params = params;
    this.componentParent = this.params.context.componentParent;
  }

  async btnClickedHandler() {
    console.log(this.componentParent);
    await this.componentParent.delete(this.params.value as number);
  }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
