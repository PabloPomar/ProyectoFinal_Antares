import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ProductosService } from '../../../Services/productos.service';
import {Producto, TipoProducto} from '../../../Models/producto';
import { Router } from '@angular/router';
import { EditButtonComponent } from '../../GridActions/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../GridActions/delete-button/delete-button.component';
import { ViewButtonComponent } from '../../GridActions/view-button/view-button.component';
import {AG_GRID_LOCALE_ES} from "../../../Models/traduccion";

@Component({
    selector: 'app-productos-grid',
    templateUrl: './productos-grid.component.html',
    styleUrls: ['./productos-grid.component.scss']
})
export class ProductosGridComponent implements OnInit
{

    modules = [ClientSideRowModelModule];

    public api: any;

    public rowHeight: number;

    public columnApi: any;

    constructor(public productoService: ProductosService,
        private router: Router)
    {
        this.context = {
            componentParent: this
        };
        this.rowHeight = 50;

    }

    productos: Producto[] = [];
    context: any;

    ngOnInit(): void
    {
        this.productoService.getAll().subscribe((data: Producto[]) => this.productos = data);

    }

    columnDefs = [
        { field: 'id', filter: true, cellStyle: {fontSize: '20px'}, maxWidth: 40},
        { field: 'nombre', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
        { field: 'subtitulo', filter: true, sortable: true , cellStyle: {fontSize: '20px'}},
        { field: 'stock', sortable: true , cellStyle: {fontSize: '20px'}, type: 'rightAligned'},
        { field: 'precio', valueFormatter: (params: { data: { precio: any; }; }) => this.currencyFormatter(params, '$'),
          sortable: true , cellStyle: {fontSize: '20px'}, type: 'rightAligned'},
        { field: 'tipoProducto', filter: true, sortable: true , cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: TipoProducto }) => {
            return (data.value !== null && data.value !== undefined)
              ? TipoProducto[data.value] : 'not found';}},
        { field: 'activo', sortable: true , cellStyle: {fontSize: '20px'}, cellRenderer: (data: { value: boolean }) => {
            return (data.value !== null && data.value !== undefined && data.value === true)
              ? '<i class="fa fa-check" style="color: green"/>' : '<i class="fa fa-x" style="color: red"/>';}},
        {
            headerName: '',
            field: 'id',
            cellRenderer: 'viewButtonComponent',
            cellRendererParams: {
                route: '/producto-form-view/'
            },
            maxWidth: 50
        },
        {
            headerName: '',
            field: 'id',
            cellRenderer: 'editButtonComponent',
            cellRendererParams: {
                route: '/producto-form-edit/'
            },
            maxWidth: 50
        },
        {
            headerName: '',
            field: 'id',
            cellRenderer: 'deleteButtonComponent',
            cellRendererParams: {

            },
            maxWidth: 75
        }
    ];

    currencyFormatter(params: any, sign: any) {
      var sansDec = params.data.precio.toFixed(2);
      return sign + `${sansDec}`;
    }

    public gridOptions = {
        rowData: this.productos,
        columnDefs: this.columnDefs,
        pagination: true,
        rowSelection: 'single',
        components: {
            editButtonComponent: EditButtonComponent,
            deleteButtonComponent: DeleteButtonComponent,
            viewButtonComponent: ViewButtonComponent
        },
      localeText: AG_GRID_LOCALE_ES
    };


    onGridReady = (params: any) =>
    {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.frameworkComponents = {
            editButtonComponent: EditButtonComponent
        };
        this.api.sizeColumnsToFit();
    };

    public async delete(id: number): Promise<void>
    {
        await this.productoService.delete(id).subscribe(_ => window.location.reload());
    }

    public async crearProducto(): Promise<void>
    {
        await this.router.navigate(['/producto-form-add']);
    }

    public async editarProducto(id: number): Promise<void>
    {
        await this.router.navigate([`/producto-form-edit/${  id}`]);
    }
}
