import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivateChild {
  constructor(public router: Router) {

  }
  canActivateChild(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let sesion: any = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    if (sesion?.tokenInfo?.token) {
      return true
    }
    this.router.navigate(['./']);
    return false;

  }
}
