import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComunComponent } from './Components/Ejemplos/comun/comun.component';
import {AgGridModule} from "@ag-grid-community/angular";
import { ProductosGridComponent } from './Components/Productos/productos-grid/productos-grid.component';
import { ProductosFormComponent } from './Components/Productos/productos-form/productos-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ComunComponent,
    ProductosGridComponent,
    ProductosFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
