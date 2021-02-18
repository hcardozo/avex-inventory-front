import { Component, OnInit } from '@angular/core';
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

  
  public listarCategorias: any[] = [];
  public segundoNivel: any ;
  public datosSesion: any;
  
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
    this.spinner.show();
    this.categoriaService.listarCategoria().subscribe((resultado: any) => {
      this.spinner.hide();
      if (resultado?.resultadoList) {
        this.listarCategorias = resultado.resultadoList;
        console.log(this.listarCategorias)
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al registrar Usuario', 'Se presentan problemas al realizar el registro de usuario, por favor intente nuevamente.');
      throw (error);
    })
  }
}
