import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarCategoriaComponent } from './components/listar-categoria/listar-categoria.component';
import { RegistrarCategoriaComponent } from './components/registrar-categoria/registrar-categoria.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registrarCategoria'
  },
  {
    path:'listarCategorias',
    component: ListarCategoriaComponent
  },
  {
    path:'registrarCategoria',
    component: RegistrarCategoriaComponent
  },
  {
    path:'modificarCategoria',
    component: RegistrarCategoriaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
