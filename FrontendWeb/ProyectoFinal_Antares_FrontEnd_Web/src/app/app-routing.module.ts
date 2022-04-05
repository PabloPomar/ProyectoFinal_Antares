import { NgModule } from '@angular/core';
import { ComunComponent } from './Components/Ejemplos/comun/comun.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductosGridComponent } from './Components/Productos/productos-grid/productos-grid.component';
import { ProductosFormComponent } from './Components/Productos/productos-form/productos-form.component';
import {LoginComponent} from "./Components/Login/login/login.component";
import {UserRegisterComponent} from "./Components/Login/user-register/user-register.component";
import {HomeComponent} from "./Components/home/home.component";
import {AuthGuard} from "./auth-guard.guard";
import {PedidosGridComponent} from "./Components/Pedidos/pedidos-grid/pedidos-grid.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'comun', component: ComunComponent },
    { path: 'productos', component: ProductosGridComponent },
    { path: 'pedidos', component: PedidosGridComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userRegister', component: UserRegisterComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'Admin'
      }
      },
    { path: 'producto-form-add', component: ProductosFormComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'Admin'
      } },
    { path: 'producto-form-edit/:id', component: ProductosFormComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'Admin'
      } },
    { path: 'producto-form-view/:idView', component: ProductosFormComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'Admin'
      } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{ }
