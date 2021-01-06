import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';

const routes: Routes = [{ path: '', component: InicioSesionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicaRoutingModule { }
