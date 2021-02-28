import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanaService } from 'avex-api';
import { ICambiarEstadoCampana } from 'avex-api/lib/modules/campana/interfaces/cambiar-estado-campana.interface';
import { NgxSpinnerService } from 'ngx-spinner';
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

  @ViewChild('paginador') paginador:any; 

  public listarCampanas: any[] = [];
  public segundoNivel: any ;
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
    private spinner: NgxSpinnerService) { 
      
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
        }, (error: any) => {
          this.spinner.hide();
          this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Campañas', 'Se presentan problemas al listar los registros de campañas, por favor intente nuevamente.');
          throw (error);
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

  public test(event:any,campana: any){
    debugger;
  }
  public cambiarEstado(event: any, campana: any) {
    let body: ICambiarEstadoCampana = {
      guid: campana.guidCampana,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre
    }
    this.campanaService.cambiarEstadoCampana({ parametro: body }).subscribe(() => { }, (error: any) => {
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar Usuario', 'Se presentan problemas al realizar actualizacion de estado de usuario, por favor intente nuevamente.');
      throw (error);
    })
  }

  // public modificarUsuario(usuario: any): void {
  //   let navigationExtas: NavigationExtras = {
  //     state: {
  //       usuario
  //     },
  //     relativeTo: this.activatedRoute.parent,
  //     skipLocationChange: true
  //   }
  //   this.router.navigate([`./modificarUsuario`], navigationExtas);
  // }

  // public eliminarUsuario(usuario: any): void {
  //   let body: IEliminarUsuario = {
  //     usuarioCreacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     fechaCreacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     guid: usuario.guid,
  //     usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre,
  //     fechaModificacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss')
  //   }
  //   let indexUsuario: number = this.listaUsuarios.findIndex(item => item.guid == usuario.guid);
  //   this.listaUsuarios.splice(indexUsuario, 1);
  //   this.usuarioService.eliminarUsuario({ parametro: body }).subscribe((response: any) => {
  //     if (response?.resultado.resultado) {
  //       this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Usuario Eliminado', 'Usuario eliminado de manera correcta.');
  //     }

  //   }, (error: any) => {
  //     this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Usuario', 'Se presentan problemas al realizar eliminacion de usuario, por favor intente nuevamente.');
  //     throw (error);
  //   })
  // }
}
