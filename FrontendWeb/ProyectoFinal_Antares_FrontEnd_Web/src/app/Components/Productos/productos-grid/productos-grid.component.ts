import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ProductosService } from '../../../Services/productos.service';
import { Producto } from '../../../Models/producto';
import { Router } from '@angular/router';
import { EditButtonComponent } from '../../GridActions/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../GridActions/delete-button/delete-button.component';
import { ViewButtonComponent } from '../../GridActions/view-button/view-button.component';

@Component({
    selector: 'app-productos-grid',
    templateUrl: './productos-grid.component.html',
    styleUrls: ['./productos-grid.component.scss']
})
export class ProductosGridComponent implements OnInit
{

    modules = [ClientSideRowModelModule];

    public api: any;

    public columnApi: any;

    constructor(public productoService: ProductosService,
        private router: Router)
    {
        this.context = {
            componentParent: this
        };
    }

    productos: Producto[] = [];
    context: any;

    ngOnInit(): void
    {
        this.productoService.getAll().subscribe((data: Producto[]) => this.productos = data);
    }

    columnDefs = [
        { field: 'id', filter: true },
        { field: 'descripcion', filter: true, sortable: true },
        { field: 'stock', sortable: true },
        { field: 'activo', sortable: true },
        { field: 'precio', sortable: true },
        {
            headerName: '',
            field: 'id',
            cellRenderer: 'viewButtonComponent',
            cellRendererParams: {
                route: '/producto-form-view/'
            },
            maxWidth: 75
        },
        {
            headerName: '',
            field: 'id',
            cellRenderer: 'editButtonComponent',
            cellRendererParams: {
                route: '/producto-form-edit/'
            },
            maxWidth: 75
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

    public gridOptions = {
        rowData: this.productos,
        columnDefs: this.columnDefs,
        pagination: true,
        rowSelection: 'single',
        components: {
            editButtonComponent: EditButtonComponent,
            deleteButtonComponent: DeleteButtonComponent,
            viewButtonComponent: ViewButtonComponent
        }
    };


    onGridReady = (params: any) =>
    {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
        this.api.frameworkComponents = {
            editButtonComponent: EditButtonComponent
        };
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
