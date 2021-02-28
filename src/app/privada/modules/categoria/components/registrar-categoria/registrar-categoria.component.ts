import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService, IModificarCategoria, IRegistrarCategoria } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent implements OnInit {
  public formularioRegistrarCategoria: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioModificacionCategoria: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required]),
    guidCategoria: new FormControl('', [Validators.required])
  });


  public formularioActual: FormGroup;

  public parametrosRuta: any = {};
  public datosSesion: any;
  public listDepartamentos: { [index: string]: string }[];
  public listMunicipios: { [index: string]: string }[];
  constructor(
    public metodosComunes: MetodosComunesService,
    public categoriaService: CategoriaService,
    public alertService: AlertaService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.parametrosRuta.datosCategoria = this.router.getCurrentNavigation()?.extras?.state?.datosCategoria;
    this.parametrosRuta.modificacion = this.parametrosRuta?.datosCategoria ? true : false;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    if (this.parametrosRuta.modificacion) {
      this.formularioActual = this.formularioModificacionCategoria;
      this.asignarValoresModificacion();
    } else {
      this.formularioActual = this.formularioRegistrarCategoria;
    }
  }

  public get formulario(): any {
    return this.formularioActual.controls
  }

  private asignarValoresModificacion(): void {
    this.formulario.nombre.setValue(this.parametrosRuta.datosCategoria.nombre);
    this.formulario.descripcion.setValue(this.parametrosRuta.datosCategoria.descripcion);
    this.formulario.guidCategoria.setValue(this.parametrosRuta.datosCategoria.guidCategoria);
    this.formulario.habilitar.setValue(this.parametrosRuta.datosCategoria.estado);
    this.formularioActual.updateValueAndValidity();
  }

  public registrarCategoria(controles: any): void {
    let body: IRegistrarCategoria = {
      usuarioCreacion: this.datosSesion.usuarioAvexInfo.usuario,
      nombre: controles.nombre.value,
      descripcion: controles.descripcion.value,
      estado: controles.habilitar.value
    }
    this.spinner.show();
    this.categoriaService.registrarCategoria({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.formularioActual.reset();
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Categoria', 'Categoria modificada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Categoria', 'Se presentan problemas al realizar la modificacion de la categoria, por favor intente nuevamente.');
      throw (error);
    })
  }
  public modificarCategoria(controles: any): void {
    let body: IModificarCategoria = {
      usuarioModificacion: this.datosSesion.usuarioAvexInfo.usuario,
      guidCategoria: controles.guidCategoria.value,
      nombre: controles.nombre.value,
      descripcion: controles.descripcion.value,
      estado: controles.habilitar.value
    }
    console.log(body)
    this.spinner.show();
    this.categoriaService.modificarCategoria({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Categoria', 'Categoria modificada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Categoria', 'Se presentan problemas al realizar la modificacion de la categoria, por favor intente nuevamente.');
      throw (error);
    })
  }
}
