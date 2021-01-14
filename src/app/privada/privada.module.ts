import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MenuModule } from 'avex-api';

import { PrivadaRoutingModule } from './privada-routing.module';
import { MaestroComponent } from './components/maestro/maestro.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [MaestroComponent],
  imports: [
    CommonModule,
    PrivadaRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MenuModule,
    CollapseModule.forRoot()
  ],
  exports: [

  ]
})
export class PrivadaModule { }
