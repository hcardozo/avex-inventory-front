import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ListarPerfilComponent } from './components/listar-perfil/listar-perfil.component';
import { RegistrarPerfilComponent } from './components/registrar-perfil/registrar-perfil.component';


@NgModule({
  declarations: [ListarPerfilComponent, RegistrarPerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilGuiModule { }
