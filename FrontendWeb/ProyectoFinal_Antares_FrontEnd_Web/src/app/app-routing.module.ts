import { NgModule } from '@angular/core';
import {ComunComponent} from "./Components/Ejemplos/comun/comun.component";
import {RouterModule, Routes} from "@angular/router";
import {ProductosGridComponent} from "./Components/Productos/productos-grid/productos-grid.component";
import {ProductosFormComponent} from "./Components/Productos/productos-form/productos-form.component";

const routes: Routes = [
  { path: 'comun', component: ComunComponent},
  { path: 'productos', component: ProductosGridComponent},
  { path: 'producto-form-add', component: ProductosFormComponent},
  { path: 'producto-form-edit/:id', component: ProductosFormComponent},
  { path: 'producto-form-view/:idView', component: ProductosFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
