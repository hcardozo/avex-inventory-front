import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampanaService, CategoriaService, EquipoService, IModificarEquipo, IRegistrarEquipo, MarcaService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-toma-individual',
  templateUrl: './toma-individual.component.html',
  styleUrls: ['./toma-individual.component.scss']
})
export class TomaIndividualComponent implements OnInit {

  public formularioRegistrarEquipo: FormGroup = new FormGroup({
    codigoBarras: new FormControl('', [Validators.required]),
    codigoEtiqueta: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    observaciones: new FormControl('', [Validators.required]),
    guidCategoria: new FormControl('', [Validators.required]),
    guidCampana: new FormControl('', [Validators.required]),
    guidMarca: new FormControl('', [Validators.required]),
    serialFabrica: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioModificacionEquipo: FormGroup = new FormGroup({
    codigoBarras: new FormControl('', [Validators.required]),
    codigoEtiqueta: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    observaciones: new FormControl('', [Validators.required]),
    guidCategoria: new FormControl('', [Validators.required]),
    guidCampana: new FormControl('', [Validators.required]),
    guidMarca: new FormControl('', [Validators.required]),
    serialFabrica: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required]),
    guidEquipo: new FormControl('', [Validators.required])
  });

  public formularioActual: FormGroup;

  public parametrosRuta: any = {};
  public datosSesion: any;
  constructor(
    public equipoService: EquipoService,
    public alertService: AlertaService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private categoriaService: CategoriaService,
    private campanaService: CampanaService,
    private marcaService: MarcaService
    ) {
    this.parametrosRuta.datosEquipo = this.router.getCurrentNavigation()?.extras?.state?.datosEquipo;
    this.parametrosRuta.modificacion = this.parametrosRuta?.datosEquipo ? true : false;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    if (this.parametrosRuta.modificacion) {
      this.formularioActual = this.formularioModificacionEquipo;
      this.asignarValoresModificacion();
    } else {
      this.formularioActual = this.formularioRegistrarEquipo;
    }
  }

  public get formulario(): any {
    return this.formularioActual.controls
  }

  private asignarValoresModificacion(): void {
    this.formulario.codigoBarras.setValue(this.parametrosRuta.datosEquipo.codigoBarras);
    this.formulario.codigoEtiqueta.setValue(this.parametrosRuta.datosEquipo.codigoEtiqueta);
    this.formulario.descripcion.setValue(this.parametrosRuta.datosEquipo.descripcion);
    this.formulario.observaciones.setValue(this.parametrosRuta.datosEquipo.observaciones);
    this.formulario.guidCategoria.setValue(this.parametrosRuta.datosEquipo.guidCategoria);
    this.formulario.guidCampana.setValue(this.parametrosRuta.datosEquipo.guidCampana);
    this.formulario.guidMarca.setValue(this.parametrosRuta.datosEquipo.guidMarca);
    this.formulario.serialFabrica.setValue(this.parametrosRuta.datosEquipo.serialFabrica);
    this.formulario.habilitar.setValue(this.parametrosRuta.datosEquipo.estado);
    this.formulario.guidEquipo.setValue(this.parametrosRuta.datosEquipo.guidEquipo);
    this.formularioActual.updateValueAndValidity();
  }


  public registrarEquipo(controles: any): void {
    let body: IRegistrarEquipo = {
      usuarioCreacion: this.datosSesion.usuarioAvexInfo.usuario,
      codigoBarras: controles.codigoBarras.value,
      codigoEtiqueta: controles.codigoEtiqueta.value,
      descripcion: controles.descripcion.value,
      observaciones: controles.observaciones.value,
      guidCategoria: controles.guidCategoria.value,
      guidCampana: controles.guidCampana.value,
      guidMarca: controles.guidMarca.value,
      serialFabrica: controles.serialFabrica.value,
      estado: controles.habilitar.value
    }
    this.spinner.show();
    this.equipoService.registrarEquipo({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.formularioActual.reset();
        this.formulario.habilitar.setValue(true);
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Registro de Equipo', 'Equipo registrada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al registrar Equipo', 'Se presentan problemas al realizar el registro de la Equipo, por favor intente nuevamente.');
      throw (error);
    })
  }
  public modificarEquipo(controles: any): void {
    let body: IModificarEquipo = {
      usuarioModificacion: this.datosSesion.usuarioAvexInfo.usuario,
      codigoBarras: controles.codigoBarras.value,
      codigoEtiqueta: controles.codigoEtiqueta.value,
      descripcion: controles.descripcion.value,
      observaciones: controles.observaciones.value,
      guidEquipo: controles.guidEquipo.value,
      guidCategoria: controles.guidCategoria.value,
      guidCampana: controles.guidCampana.value,
      guidMarca: controles.guidMarca.value,
      serialFabrica: controles.serialFabrica.value,
      estado: controles.habilitar.value
    }
    this.spinner.show();
    this.equipoService.modificarEquipo({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.formularioActual.reset();
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Equipo', 'Equipo modificada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Equipo', 'Se presentan problemas al realizar la modificacion de la Equipo, por favor intente nuevamente.');
      throw (error);
    })
  }

}
