import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarMarcaComponent } from './components/listar-marca/listar-marca.component';
import { RegistrarMarcaComponent } from './components/registrar-marca/registrar-marca.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarMarcas'
  },
  {
    path:'listarMarcas',
    component: ListarMarcaComponent
  },
  {
    path:'registrarMarca',
    component: RegistrarMarcaComponent
  },
  {
    path:'modificarMarca',
    component: RegistrarMarcaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
