import { NgModule } from '@angular/core';
import {ComunComponent} from "./Components/Ejemplos/comun/comun.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'comun', component: ComunComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
