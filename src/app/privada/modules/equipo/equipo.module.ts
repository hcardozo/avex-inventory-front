import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { ListarEquipoComponent } from './components/listar-equipo/listar-equipo.component';
import { TomaIndividualComponent } from './components/toma-individual/toma-individual.component';
import { TomaMasivaComponent } from './components/toma-masiva/toma-masiva.component';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { EquipoModule } from 'avex-api';


@NgModule({
  declarations: [ListarEquipoComponent, TomaIndividualComponent, TomaMasivaComponent],
  imports: [
    CommonModule,
    CompartidoModule,
    EquipoModule,
    EquipoRoutingModule
  ]
})
export class EquipoGuiModule { }
