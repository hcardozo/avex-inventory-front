import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CampanaService, ICambiarEstado, IEliminarRegistro } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-listar-campana',
  templateUrl: './listar-campana.component.html',
  styleUrls: ['./listar-campana.component.scss']
})
export class ListarCampanaComponent implements OnInit {

  @ViewChild('paginador') paginador: any;

  public listarCampanas: any[] = [];
  public segundoNivel: any;
  public datosSesion: any;
  public pagina: number = 1;
  public registros: number = 5;
  public registrosHabilitados: number[] = [5, 10, 20, 50]
  public totalPaginas: number;
  public totalRegistros: number;

  constructor(private campanaService: CampanaService,
    private metodosComunes: MetodosComunesService,
    private alertService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService) {
    this.segundoNivel = this.router.getCurrentNavigation()?.extras?.state?.datos;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    this.refrescarTabla();
  }

  public refrescarTabla(): void {
    this.spinner.show();
    this.campanaService.infoPaginacion({ parametro: { registros: this.registros } }).subscribe((response: any) => {
      if (response.resultado != null) {
        this.totalPaginas = response.resultado.totalPaginas;
        this.totalRegistros = response.resultado.totalRegistros;
        this.campanaService.listarCampanas({ parametro: { pagina: this.pagina, registros: this.registros } }).subscribe((resultado: any) => {
          this.spinner.hide();
          if (resultado?.resultadoList) {
            this.listarCampanas = resultado.resultadoList;
          }
        }, (e: any) => {
          this.spinner.hide();
          if(e.error){
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Campañas', e.error);

          }else{
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Campañas', 'Se presentan problemas al listar los registros de campañas, por favor intente nuevamente.');
            throw (e);
          }
        })
      }
    })
  }

  public cambioCantidadRegistros(): void {
    this.pagina = 1;
    this.paginador.changePage(0);
    this.refrescarTabla();
  }

  public cambiarPagina(evento: any): void {
    this.pagina = evento.page + 1;
    this.refrescarTabla();
  }

  public cambiarEstado(event: any, campana: any) {
    this.spinner.show();
    let body: ICambiarEstado = {
      guid: campana.guidCampana,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.usuario
    }
    this.campanaService.cambiarEstadoCampana({ parametro: body }).subscribe(() => { this.spinner.hide(); }, (e: any) => {
      this.spinner.hide();
      if (e.error) {
        this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar la Campaña', e.error);
      } else {
        this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar la Campaña', 'Se presentan problemas al realizar actualizacion de estado de usuario, por favor intente nuevamente.');
        throw (e);
      }
    })
  }

  public modificarCampana(campana: any): void {
    let navigationExtas: NavigationExtras = {
      state: {
        campana
      },
      relativeTo: this.activatedRoute.parent,
      skipLocationChange: true
    }
    this.router.navigate([`./modificarCampana`], navigationExtas);
  }

  public eliminarCampana(campana: any): void {
    this.confirmationService.confirm({
      message: `Esta seguro que desea eliminar la campaña ${campana.nombre}?`,
      header: 'Eliminar Campaña',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.spinner.show();
        let body: IEliminarRegistro = {
          guid: campana.guidCampana,
          usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.usuario
        }
        let indexUsuario: number = this.listarCampanas.findIndex(item => item.guidCampana == campana.guidCampana);
        this.listarCampanas.splice(indexUsuario, 1);
        this.campanaService.eliminarCampana({ parametro: body }).subscribe((response: any) => {
          if (response?.resultado.resultado) {
            this.cambioCantidadRegistros();
            this.spinner.hide();
            this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Campaña Eliminada', 'Campaña eliminada de manera correcta.');
          }

        }, (e: any) => {
          this.spinner.hide();
          if (e.error) {
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar la Campaña', e.error);
          } else {
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar la Campaña', 'Se presentan problemas al realizar eliminacion de la campaña, por favor intente nuevamente.');
            throw (e);
          }
        })
      },
      reject: () => {

      }
    });
  }
}
