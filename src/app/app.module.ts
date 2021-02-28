import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompartidoModule } from './compartido/compartido.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfiguracionApexApiModule } from 'avex-api';
import { IConfiguracionUrl } from 'avex-api/lib/interfaces/configuracion-url.interface';
import { AutenticacionInterceptor } from './privada/inteceptors/autenticacion.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ConfiguracionApexApiModule.forRoot(environment.configuracionUrl)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacionInterceptor,
      multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
