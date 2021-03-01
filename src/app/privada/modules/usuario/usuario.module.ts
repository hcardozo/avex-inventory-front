import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { PerfilModule, UsuarioModule } from 'avex-api';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
@NgModule({
  declarations: [RegistrarUsuarioComponent, ListarUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CompartidoModule,
    UsuarioModule,
    PerfilModule
  ]
})
export class UsuarioGuiModule { }
