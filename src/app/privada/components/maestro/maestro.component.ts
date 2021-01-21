import { ChangeDetectorRef, Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuService } from 'avex-api';
import { IConsultarMenu } from 'avex-api/lib/modules/menu/interfaces/consultar-menu.interface';
import { USER_SESION_KEY } from 'src/environments/constantes';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnDestroy {

  private mobileQueryListener: () => void;

  public mobileQuery: MediaQueryList;
  public menu: any;
  public estadoItemMenu: boolean[] = [];
  
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.cargarMenu();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  private cargarMenu(): void {
    let sesionUsuario: any = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    let objeto: any = {
      guid: sesionUsuario ? sesionUsuario.usuarioAvexInfo.guid : ''
    }
    
    this.menuService.consultarMenu({ parametro: objeto }).subscribe((data: any) => {
      if (data && data.resultadoList) {
        data.resultadoList.forEach(element => {
          let opcionesAnidadas: any = element.itemMenu.filter((item) => item.nivelMenu === 2);
          element.anidados = opcionesAnidadas;
        });
        this.menu = data ? data.resultadoList : [];
      }
    });
  }

  public cambiarEstadoItemMenu(estado: { [index: string]: any }) {
    estado.seleccionado = estado.seleccionado!
  }

  public redireccionar(ruta: string, datos: any) {
    let parametro: NavigationExtras = {
      state: {
        datos
      },
      relativeTo: this.activatedRoute.parent
    }
    this.router.navigate([`.${ruta}`], parametro);
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate([`./`]);
  }
}
