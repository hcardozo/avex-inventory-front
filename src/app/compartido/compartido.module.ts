import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MetodosComunesService } from './services/metodosComunes/metodos-comunes.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertaService } from './services/alerta/alerta.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule
  ],
  providers: [
    MetodosComunesService,
    AlertaService,
    NgxSpinnerModule,
    DatePipe,
    ConfirmationService
  ],
  exports: [
    ConfirmDialogModule
  ]
})
export class CompartidoModule { }
