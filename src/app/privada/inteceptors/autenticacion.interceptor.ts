import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let datosSesion: any = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    let request: HttpRequest<unknown>;
    if (datosSesion) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${datosSesion.tokenInfo.token}`
        }
      });
      console.log('Agrega autorizacion como header')
    } else {
      request = req.clone();
    }
    return next.handle(request);
  }
}
