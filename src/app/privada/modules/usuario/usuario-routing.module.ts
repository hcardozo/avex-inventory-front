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
    path:'listarUsuarios',
    component: ListarUsuarioComponent
  },
  {
    path:'registrarUsuario',
    component: RegistrarUsuarioComponent
  },
  {
    path:'modificarUsuario',
    component: RegistrarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
