import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MetodosComunesService } from './services/metodosComunes/metodos-comunes.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertaService } from './services/alerta/alerta.service';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule
  ],
  providers: [
    MetodosComunesService,
    AlertaService,
    NgxSpinnerModule,
    DatePipe
  ]
})
export class CompartidoModule { }
