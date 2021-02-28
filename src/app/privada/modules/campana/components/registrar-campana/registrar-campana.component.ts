import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampanaService, DivipolaService, IModificarCampana } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-registrar-campana',
  templateUrl: './registrar-campana.component.html',
  styleUrls: ['./registrar-campana.component.scss']
})
export class RegistrarCampanaComponent implements OnInit {

  public formularioRegistrarCampana: FormGroup = new FormGroup({
    departamento: new FormControl(null, [Validators.required]),
    municipio: new FormControl(null, [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    detalleDireccion: new FormControl('', [Validators.required]),
    telefono: new FormControl(null, [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioModificacionCampana: FormGroup = new FormGroup({
    guid: new FormControl('', [Validators.required]),
    departamento: new FormControl(null, [Validators.required]),
    municipio: new FormControl(null, [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    detalleDireccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioActual: FormGroup;

  public parametrosRuta: any = {};
  public datosSesion: any;
  public listDepartamentos: { [index: string]: string }[];
  public listMunicipios: { [index: string]: string }[];


  constructor(
    public formBuilder: FormBuilder,
    public metodosComunes: MetodosComunesService,
    public campanaService: CampanaService,
    public alertService: AlertaService,
    public divipolaService: DivipolaService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.parametrosRuta.datosCampana = this.router.getCurrentNavigation()?.extras?.state?.campana;
    this.parametrosRuta.modificacion = this.parametrosRuta?.datosCampana ? true : false;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    this.divipolaService.listarDepartamentos().subscribe((response: any) => {
      this.listDepartamentos = response.tipoMensaje == 0 ? response.resultadoList : null;
    });
    if (this.parametrosRuta.modificacion) {
      this.formularioActual = this.formularioModificacionCampana;
      this.asignarValoresModificacion();
    } else {
      this.formularioActual = this.formularioRegistrarCampana;
    }
  }

  public get formulario(): any {
    return this.formularioActual.controls
  }

  private asignarValoresModificacion(): void {
    this.formulario.guid.setValue(this.parametrosRuta.datosCampana.guidCampana);
    this.formulario.departamento.setValue(this.parametrosRuta.datosCampana.codDepto);
    this.spinner.show();
    this.consultarMunicipios(this.formularioActual.controls);
    this.spinner.hide();
    this.formulario.municipio.setValue(this.parametrosRuta.datosCampana.codMunicipio);
    this.formulario.nombre.setValue(this.parametrosRuta.datosCampana.nombre);
    this.formulario.direccion.setValue(this.parametrosRuta.datosCampana.direccion);
    this.formulario.detalleDireccion.setValue(this.parametrosRuta.datosCampana.detalleDireccion);
    this.formulario.telefono.setValue(this.parametrosRuta.datosCampana.telefono);
    this.formulario.habilitar.setValue(this.parametrosRuta.datosCampana.estado);
    this.formularioActual.updateValueAndValidity();
  }

  public consultarMunicipios(formulario: any): void {
    this.divipolaService.listarMunicipios({ parametro: { codDepto: formulario.departamento.value } }).subscribe((response: any) => {
      this.listMunicipios = response.tipoMensaje == 0 ? response.resultadoList : null;
    });
  }

  public modificarCampana(controles: any): void {
    let datosSesion: any = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    debugger
    let body: IModificarCampana = {
      guidCampana: controles.guid.value,
      codDepto: controles.departamento.value,
      codMunicipio: controles.municipio.value,
      nombre:controles.nombre.value,
      direccion: controles.direccion.value,
      detalleDireccion: controles.detalleDireccion.value,
      telefono: controles.telefono.value,
      estado: controles.habilitar.value,
      usuarioModificacion: datosSesion.usuarioAvexInfo.usuario
    }
    this.spinner.show();
    this.campanaService.modificarCampana({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Camaña', 'Campaña modificada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Campaña', 'Se presentan problemas al realizar la modificacion de la campaña, por favor intente nuevamente.');
      throw (error);
    })
  }


}
