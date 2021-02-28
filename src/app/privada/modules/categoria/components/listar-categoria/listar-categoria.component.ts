import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.scss']
})
export class ListarCategoriaComponent implements OnInit {

  @ViewChild('paginador') paginador: any;

  public listarCategorias: any[] = [];
  public segundoNivel: any ;
  public datosSesion: any;
  public pagina: number = 1;
  public registros: number = 5;
  public registrosHabilitados: number[] = [5, 10, 20, 50]
  public totalPaginas: number;
  public totalRegistros: number;
  
  constructor(private categoriaService: CategoriaService,
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
    this.categoriaService.infoPaginacion({ parametro: { registros: this.registros } }).subscribe((response: any) => {
      if (response.resultado != null) {
        this.totalPaginas = response.resultado.totalPaginas;
        this.totalRegistros = response.resultado.totalRegistros;
        this.categoriaService.listarCategoria({ parametro: { pagina: this.pagina, registros: this.registros } }).subscribe((resultado: any) => {
          this.spinner.hide();
          if (resultado?.resultadoList) {
            this.listarCategorias = resultado.resultadoList;
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
}
