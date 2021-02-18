import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPerfilComponent } from './components/listar-perfil/listar-perfil.component';
import { RegistrarPerfilComponent } from './components/registrar-perfil/registrar-perfil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarPerfiles'
  },
  {
    path:'listarPerfiles',
    component: ListarPerfilComponent
  },
  {
    path:'registrarPerfil',
    component: RegistrarPerfilComponent
  },
  {
    path:'modificarPerfil',
    component: RegistrarPerfilComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
