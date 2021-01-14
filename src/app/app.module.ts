import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompartidoModule } from './compartido/compartido.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfiguracionApexApiModule } from 'avex-api';
import { IConfiguracionUrl } from 'avex-api/lib/interfaces/configuracion-url.interface';

const configuracionUrl: IConfiguracionUrl = {
  dominio: '26.11.114.212',
  prefijo: 'api',
  protocolo: 'https',
  puerto: '5001'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompartidoModule,
    BrowserAnimationsModule,
    ConfiguracionApexApiModule.forRoot(configuracionUrl)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
