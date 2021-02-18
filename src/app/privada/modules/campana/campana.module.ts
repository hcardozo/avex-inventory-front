import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampanaRoutingModule } from './campana-routing.module';
import { RegistrarCampanaComponent } from './components/registrar-campana/registrar-campana.component';
import { ListarCampanaComponent } from './components/listar-campana/listar-campana.component';
import { CampanaModule } from 'avex-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [RegistrarCampanaComponent, ListarCampanaComponent],
  imports: [
    CommonModule,
    CampanaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    CampanaModule,
    CompartidoModule,
    InputSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ]
})
export class CampanaGuiModule { }
