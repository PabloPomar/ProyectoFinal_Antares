import { NgModule } from '@angular/core';
import { ComunComponent } from './Components/Ejemplos/comun/comun.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductosGridComponent } from './Components/Productos/productos-grid/productos-grid.component';
import { ProductosFormComponent } from './Components/Productos/productos-form/productos-form.component';
import {LoginComponent} from "./Components/Login/login/login.component";
import {UserRegisterComponent} from "./Components/Login/user-register/user-register.component";
import {HomeComponent} from "./Components/home/home.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'comun', component: ComunComponent },
    { path: 'productos', component: ProductosGridComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userRegister', component: UserRegisterComponent },
    { path: 'producto-form-add', component: ProductosFormComponent },
    { path: 'producto-form-edit/:id', component: ProductosFormComponent },
    { path: 'producto-form-view/:idView', component: ProductosFormComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{ }
