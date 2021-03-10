import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ICambiarEstado, IEliminarRegistro, MarcaService } from 'avex-api';
import { IBodyServicio } from 'avex-api/lib/interfaces/body-servicio.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.scss']
})
export class ListarMarcaComponent implements OnInit {


  @ViewChild('paginador') paginador: any;

  public listaMarcas: any[] = [];
  public segundoNivel: any;
  public datosSesion: any;
  public pagina: number = 1;
  public registros: number = 5;
  public registrosHabilitados: number[] = [5, 10, 20, 50]
  public totalPaginas: number;
  public totalRegistros: number;

  constructor(private marcaService: MarcaService,
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
    this.marcaService.infoPaginacion({ parametro: { registros: this.registros } }).subscribe((response: any) => {
      if (response.resultado != null) {
        this.totalPaginas = response.resultado.totalPaginas;
        this.totalRegistros = response.resultado.totalRegistros;
        this.marcaService.listarMarca({ parametro: { pagina: this.pagina, registros: this.registros } }).subscribe((resultado: any) => {
          this.spinner.hide();
          if (resultado?.resultadoList) {
            this.listaMarcas = resultado.resultadoList;
          }
        }, (e: any) => {
          this.spinner.hide();
          if (e.error) {
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Marcas', e.error);
          } else {
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Marcas', 'Se presentan problemas al listar los registros de marcas, por favor intente nuevamente.');
            throw (e);
          }
        })
      }
    })
  }

  public modificarMarca(datosMarca: any): void {
    let navigationExtas: NavigationExtras = {
      state: {
        datosMarca
      },
      relativeTo: this.activatedRoute.parent,
      skipLocationChange: true
    }
    this.router.navigate([`./modificarMarca`], navigationExtas);
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

  public eliminarMarca(marca: any): void {
    this.confirmationService.confirm({
      message: `¿Esta seguro que desea eliminar la marca ${marca.nombre}?`,
      header: 'Eliminar Marca',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.spinner.show();
        let body: IBodyServicio<IEliminarRegistro> = {
          parametro: {
            usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.usuario,
            guid: marca.guidMarca

          }
        }
        this.marcaService.eliminarMarca(body).subscribe((response: any) => {
          if (response?.resultado.resultado) {
            this.cambioCantidadRegistros();
            this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Marca Eliminada', 'Marca eliminada de manera correcta.');
          }

        }, (e: any) => {
          this.spinner.hide();
          if (e.error) {
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Marca', e.error);
          } else {
            this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Marca', 'Se presentan problemas al realizar eliminación de la marca, por favor intente nuevamente.');
            throw (e);
          }
        });
      },
      reject: () => {

      }
    });
  }

  public cambiarEstado(usuario: any) {
    this.spinner.show();
    let body: ICambiarEstado = {
      guid: usuario.guidMarca,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.usuario
    }
    this.marcaService.cambiarEstadoMarca({ parametro: body }).subscribe(() => { this.spinner.hide(); }, (e: any) => {
      this.spinner.hide();
      if (e.error) {
        this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar Marca', e.error);
      } else {
        this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar Marca', 'Se presentan problemas al realizar actualizacion de estado de marca, por favor intente nuevamente.');
        throw (e);
      }
    })
  }
}
