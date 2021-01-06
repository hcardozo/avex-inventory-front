import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { PrivadaRoutingModule } from './privada-routing.module';
import { MaestroComponent } from './components/maestro/maestro.component';

@NgModule({
  declarations: [MaestroComponent],
  imports: [
    CommonModule,
    PrivadaRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [

  ]
})
export class PrivadaModule { }
