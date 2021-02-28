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
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [ListarCategoriaComponent, RegistrarCategoriaComponent],
  imports: [
    CommonModule,
    CompartidoModule,
    CategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    CategoriaModule,
    InputSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    PaginatorModule
  ]
})
export class CategoriaGuiModule { }
