import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ICambiarEstado, IEliminarRegistro, ModuloService, PerfilService } from 'avex-api';
import { IBodyServicio } from 'avex-api/lib/interfaces/body-servicio.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-listar-perfil',
  templateUrl: './listar-perfil.component.html',
  styleUrls: ['./listar-perfil.component.scss']
})
export class ListarPerfilComponent implements OnInit {

  @ViewChild('paginador') paginador: any;

  public listaPerfiles: any[] = [];
  public segundoNivel: any;
  public datosSesion: any;
  public pagina: number = 1;
  public registros: number = 5;
  public registrosHabilitados: number[] = [5, 10, 20, 50]
  public totalPaginas: number;
  public totalRegistros: number;
  public display: boolean = false;
  public vistaPreviaModulos: any;

  constructor(private perfilService: PerfilService,
    private moduloService: ModuloService,
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
    this.perfilService.infoPaginacion({ parametro: { registros: this.registros } }).subscribe((response: any) => {
      if (response.resultado != null) {
        this.totalPaginas = response.resultado.totalPaginas;
        this.totalRegistros = response.resultado.totalRegistros;
        this.perfilService.listarPerfil({ parametro: { pagina: this.pagina, registros: this.registros } }).subscribe((resultado: any) => {
          this.spinner.hide();
          if (resultado?.resultadoList) {
            this.listaPerfiles = resultado.resultadoList;
          }
        }, (error: any) => {
          this.spinner.hide();
          this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Perfiles', 'Se presentan problemas al listar los perfiles, por favor intente nuevamente.');
          throw (error);
        })
      }
    })
  }

  public modificarPerfil(datosPerfil: any): void {
    let navigationExtas: NavigationExtras = {
      state: {
        datosPerfil
      },
      relativeTo: this.activatedRoute.parent,
      skipLocationChange: true
    }
    this.router.navigate([`./modificarPerfil`], navigationExtas);
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

  public eliminarPerfil(perfil: any): void {
    this.confirmationService.confirm({
      message: `¿Esta seguro que desea eliminar el perfil ${perfil.nombre}?`,
      header: 'Eliminar Perfil',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.spinner.show();
        let body: IBodyServicio<IEliminarRegistro> = {
          parametro: {
            usuarioModificacion: this.datosSesion.usuarioAvexInfo.nombre,
            guid: perfil.guid_perfil

          }
        }
        this.perfilService.eliminarPerfil(body).subscribe((response: any) => {
          if (response?.resultado.resultado) {
            this.cambioCantidadRegistros();
            this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Perfil Eliminado', 'Perfil eliminado de manera correcta.');
          }

        }, (error: any) => {
          this.spinner.hide();
          this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Perfil', 'Se presentan problemas al realizar eliminación de la Perfil, por favor intente nuevamente.');
          throw (error);
        });
      },
      reject: () => {

      }
    });
  }

  public cambiarEstado(perfil: any) {
    this.spinner.show();
    let body: ICambiarEstado = {
      guid: perfil.guid_perfil,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre
    }
    this.perfilService.cambiarEstadoPerfil({ parametro: body }).subscribe(() => { this.spinner.hide(); }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar Perfil', 'Se presentan problemas al realizar actualizacion de estado de perfil, por favor intente nuevamente.');
      throw (error);
    })
  }

  public showDialog(modulos: any): void {
    debugger
    this.display = true;
    this.vistaPreviaModulos = modulos;
  }
}
