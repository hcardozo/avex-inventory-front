import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { RegistrarMarcaComponent } from './components/registrar-marca/registrar-marca.component';
import { ListarMarcaComponent } from './components/listar-marca/listar-marca.component';
import { MarcaModule } from 'avex-api';
import { CompartidoModule } from 'src/app/compartido/compartido.module';


@NgModule({
  declarations: [RegistrarMarcaComponent, ListarMarcaComponent],
  imports: [
    CommonModule,
    CompartidoModule,
    MarcaRoutingModule,
    MarcaModule
  ]
})
export class MarcaGuiModule { }
