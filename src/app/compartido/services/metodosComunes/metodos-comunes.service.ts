import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class MetodosComunesService {

  constructor(
    public datepipe: DatePipe
  ) { }

  public generarContrasenaAleatoria(tamaño: number): string {
    let posiblesCaracteres: string ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var tamañoPosiblesCaracteres= posiblesCaracteres.length;
    let contraseña: string = '';
    for ( var i = 0; i < tamaño; i++ ) {
      contraseña += posiblesCaracteres.charAt(Math.floor(Math.random() * tamañoPosiblesCaracteres));
    }
    return contraseña;
  }

  public obtenerFecha(fechaActual: Date, format?: string): string {
    return this.datepipe.transform(fechaActual, format);
  }
}
