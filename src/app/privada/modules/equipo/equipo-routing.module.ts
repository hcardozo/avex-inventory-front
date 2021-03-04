import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarEquipoComponent } from './components/listar-equipo/listar-equipo.component';
import { TomaIndividualComponent } from './components/toma-individual/toma-individual.component';
import { TomaMasivaComponent } from './components/toma-masiva/toma-masiva.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarEquipos'
  },
  {
    path:'listarEquipos',
    component: ListarEquipoComponent
  },
  {
    path:'modificarEquipo',
    component: TomaIndividualComponent
  },
  {
    path:'tomaIndividualInventario',
    component: TomaIndividualComponent
  },
  {
    path:'tomamasivaInventario',
    component: TomaMasivaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoRoutingModule { }
