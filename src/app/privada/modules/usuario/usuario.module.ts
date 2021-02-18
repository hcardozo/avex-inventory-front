import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsuarioModule } from 'avex-api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacionInterceptor } from '../../inteceptors/autenticacion.interceptor';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [RegistrarUsuarioComponent, ListarUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CompartidoModule,
    FormsModule,
    UsuarioModule,
    ButtonModule,
    TableModule,
    InputSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacionInterceptor,
      multi: true
    }
  ]
})
export class UsuarioGuiModule { }