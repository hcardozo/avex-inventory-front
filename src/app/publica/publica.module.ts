import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicaRoutingModule } from './publica-routing.module';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioModule } from 'avex-api';
import { CompartidoModule } from '../compartido/compartido.module';


@NgModule({
  declarations: [InicioSesionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicaRoutingModule,
    CompartidoModule,
    UsuarioModule
  ]
})
export class PublicaModule { }
