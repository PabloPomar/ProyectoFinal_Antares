import { Component, OnInit } from '@angular/core';
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ProductosService} from "../../../Services/productos.service";
import {Producto} from "../../../Models/producto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-productos-grid',
  templateUrl: './productos-grid.component.html',
  styleUrls: ['./productos-grid.component.scss']
})
export class ProductosGridComponent implements OnInit {

  modules = [ClientSideRowModelModule];

  public api: any;

  public columnApi: any;

  constructor(public productoService: ProductosService,
              private router: Router) {
  }

  productos: Producto[] = [];

  ngOnInit(): void {
    this.productoService.getAll().subscribe((data: Producto[]) => this.productos = data);
  }

  columnDefs = [
    {field: 'id', filter: true},
    {field: 'descripcion', filter: true, sortable: true},
    {field: 'stock', sortable: true},
    {field: 'activo', sortable: true},
    {field: 'precio', sortable: true},
  ];

  onGridReady = (params: any) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }

  async crearProducto(): Promise<void> {
    await this.router.navigate(['/producto-form'])
  }
}
