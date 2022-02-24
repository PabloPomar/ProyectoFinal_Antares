import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComunComponent } from './Components/Ejemplos/comun/comun.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { ProductosGridComponent } from './Components/Productos/productos-grid/productos-grid.component';
import { ProductosFormComponent } from './Components/Productos/productos-form/productos-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditButtonComponent } from './Components/GridActions/edit-button/edit-button.component';
import { DeleteButtonComponent } from './Components/GridActions/delete-button/delete-button.component';
import { ViewButtonComponent } from './Components/GridActions/view-button/view-button.component';

@NgModule({
    declarations: [
        AppComponent,
        ComunComponent,
        ProductosGridComponent,
        ProductosFormComponent,
        EditButtonComponent,
        DeleteButtonComponent,
        ViewButtonComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AgGridModule.withComponents([EditButtonComponent, DeleteButtonComponent, ViewButtonComponent]),
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{ }
