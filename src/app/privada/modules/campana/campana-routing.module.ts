import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarCampanaComponent } from './components/listar-campana/listar-campana.component';
import { RegistrarCampanaComponent } from './components/registrar-campana/registrar-campana.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarCampanas'
  },
  {
    path:'listarCampanas',
    component: ListarCampanaComponent
  },
  {
    path:'registrarCampana',
    component: RegistrarCampanaComponent
  },
  {
    path:'modificarCampana',
    component: RegistrarCampanaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampanaRoutingModule { }
