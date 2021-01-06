import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivadaRoutingModule } from './privada-routing.module';
import { MaestroComponent } from './components/maestro/maestro.component';

@NgModule({
  declarations: [MaestroComponent],
  imports: [
    CommonModule,
    PrivadaRoutingModule
  ]
})
export class PrivadaModule { }
