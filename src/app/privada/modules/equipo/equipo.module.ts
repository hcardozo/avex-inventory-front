import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { ListarEquipoComponent } from './components/listar-equipo/listar-equipo.component';


@NgModule({
  declarations: [ListarEquipoComponent],
  imports: [
    CommonModule,
    EquipoRoutingModule
  ]
})
export class EquipoGuiModule { }
