import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanLoad {
  constructor() {
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let sesion: any = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    return sesion && sesion.tokenInfo.token ? true : false;

  }
}
