import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { LoginComponent } from './Components/Login/login/login.component';
import { UserRegisterComponent } from './Components/Login/user-register/user-register.component';
import {AuthInterceptor} from "./Interceptors/auth-interceptor.interceptor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        AppComponent,
        ComunComponent,
        ProductosGridComponent,
        ProductosFormComponent,
        EditButtonComponent,
        DeleteButtonComponent,
        ViewButtonComponent,
        LoginComponent,
        UserRegisterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AgGridModule.withComponents([EditButtonComponent, DeleteButtonComponent, ViewButtonComponent]),
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule
{ }
