import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registrarUsuario'
  },
  {
    path:'registrarUsuario',
    component: RegistrarUsuarioComponent
  },
  {
    path:'listarUsuarios',
    component: ListarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
