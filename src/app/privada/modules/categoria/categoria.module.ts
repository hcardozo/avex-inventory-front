import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { ListarCategoriaComponent } from './components/listar-categoria/listar-categoria.component';
import { RegistrarCategoriaComponent } from './components/registrar-categoria/registrar-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CategoriaModule } from 'avex-api';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [ListarCategoriaComponent, RegistrarCategoriaComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    CategoriaModule,
    CompartidoModule,
    InputSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ]
})
export class CategoriaGuiModule { }
