import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "@ag-grid-community/angular";
import {Router} from "@angular/router";
import {ICellRendererParams} from "@ag-grid-community/core";

@Component({
  selector: 'app-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.scss']
})
export class ViewButtonComponent implements ICellRendererAngularComp, OnDestroy {
  private params: any;

  constructor(private router: Router) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  async btnClickedHandler() {
    await this.router.navigate([this.params.route + this.params.value])
  }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
