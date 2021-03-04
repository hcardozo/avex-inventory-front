import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MetodosComunesService } from './services/metodosComunes/metodos-comunes.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertaService } from './services/alerta/alerta.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    PaginatorModule
  ],
  providers: [
    MetodosComunesService,
    AlertaService,
    NgxSpinnerModule,
    DatePipe,
    ConfirmationService
  ],
  exports: [
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputSwitchModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    PaginatorModule,
    DialogModule
  ]
})
export class CompartidoModule { }
