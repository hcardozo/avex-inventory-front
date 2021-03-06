import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IEliminarRegistro, UsuarioService } from 'avex-api';
import { ICambiarEstado } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  
@ViewChild('paginador') paginador: any;

  public listaUsuarios: any[] = [];
  public segundoNivel: any;
  public datosSesion: any;
  public pagina: number = 1;
  public registros: number = 5;
  public registrosHabilitados: number[] = [5, 10, 20, 50]
  public totalPaginas: number;
  public totalRegistros: number;

  constructor(private usuarioService: UsuarioService,
    private metodosComunes: MetodosComunesService,
    private alertService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig) {

    this.segundoNivel = this.router.getCurrentNavigation()?.extras?.state?.datos;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    this.primengConfig.ripple = true;
    this.refrescarTabla();
  }

  public cambiarEstado(event: any, usuario: any) {
    this.spinner.show();
    let body: ICambiarEstado = {
      guid: usuario.guid,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre
    }
    this.usuarioService.cambiarEstadoUsuario({ parametro: body }).subscribe(() => { this.spinner.hide();}, (e: any) => {
      this.spinner.hide();
      if(e.error){
        this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Usuario', e.error);
      }else{
        this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar Usuario', 'Se presentan problemas al realizar actualizacion de estado de usuario, por favor intente nuevamente.');
      throw (e);
      }
    });
  }

  public modificarUsuario(usuario: any): void {
    let navigationExtas: NavigationExtras = {
      state: {
        usuario
      },
      relativeTo: this.activatedRoute.parent,
      skipLocationChange: true
    }
    this.router.navigate([`./modificarUsuario`], navigationExtas);
  }

  public eliminarUsuario(usuario: any): void {
    this.confirmationService.confirm({
      message: `Esta seguro que desea eliminar el usario ${usuario.usuario}?`,
      header: 'Eliminar Usuario',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.spinner.show();
        let body: IEliminarRegistro = {
          guid: usuario.guid,
          usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre
        }
        let indexUsuario: number = this.listaUsuarios.findIndex(item => item.guid == usuario.guid);
        this.listaUsuarios.splice(indexUsuario, 1);
        this.usuarioService.eliminarUsuario({ parametro: body }).subscribe((response: any) => {
          this.spinner.hide();
          if (response?.resultado.resultado) {
            this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Usuario Eliminado', 'Usuario eliminado de manera correcta.');
          }
    
        }, (e: any) => {
          this.spinner.hide();
          if(e.error){
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Usuario', e.error);
          }else{
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Usuario', 'Se presentan problemas al realizar eliminacion de usuario, por favor intente nuevamente.');
          throw (e);
          }
        })
      },
      reject: () => {
          
      }
  });
  }

  public cambioCantidadRegistros(): void {
    this.pagina = 1;
    this.paginador.changePage(0);
    this.refrescarTabla();
  }

  public refrescarTabla(): void {
    this.spinner.show();
    this.usuarioService.infoPaginacion({ parametro: { registros: this.registros } }).subscribe((response: any) => {
      if (response.resultado != null) {
        this.totalPaginas = response.resultado.totalPaginas;
        this.totalRegistros = response.resultado.totalRegistros;
        this.usuarioService.listarUsuarios({ parametro: { pagina: this.pagina, registros: this.registros } }).subscribe((resultado: any) => {
          this.spinner.hide();
          if (resultado?.resultadoList) {
            this.listaUsuarios = resultado.resultadoList;
          }
        }, (e: any) => {
          this.spinner.hide();
          if(e.error){
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Usuarios', e.error);

          }else{
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Usuarios', 'Se presentan problemas al realizar el registro de usuario, por favor intente nuevamente.');
            throw (e);
          }
        })
      }
    })
  }

  public cambiarPagina(evento: any): void {
    this.pagina = evento.page + 1;
    this.refrescarTabla();
  }

}
