import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicaRoutingModule } from './publica-routing.module';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioModule } from 'avex-api';


@NgModule({
  declarations: [InicioSesionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicaRoutingModule,
    UsuarioModule
  ]
})
export class PublicaModule { }
