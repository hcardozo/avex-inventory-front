import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';

import { MenuModule } from 'avex-api';

import { PrivadaRoutingModule } from './privada-routing.module';
import { MaestroComponent } from './components/maestro/maestro.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { InicioComponent } from './components/inicio/inicio.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { ButtonModule } from 'primeng/button';
import { Ripple, RippleModule } from 'primeng/ripple';
@NgModule({
  declarations: [MaestroComponent, InicioComponent],
  imports: [
    CommonModule,
    CompartidoModule,
    PrivadaRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    CollapseModule.forRoot()
  ],
  exports: [
    TableModule

  ]
})
export class PrivadaModule { }
