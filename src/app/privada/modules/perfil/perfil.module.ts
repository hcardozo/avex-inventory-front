import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ListarPerfilComponent } from './components/listar-perfil/listar-perfil.component';
import { RegistrarPerfilComponent } from './components/registrar-perfil/registrar-perfil.component';
import { ModuloModule, PerfilModule } from 'avex-api';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [ListarPerfilComponent, RegistrarPerfilComponent],
  imports: [
    CommonModule,
    CompartidoModule,
    PerfilRoutingModule,
    PerfilModule,
    ModuloModule
  ]
})
export class PerfilGuiModule { }
