import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IModificarPerfil, IRegistrarPerfil, ModuloService, PerfilService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-registrar-perfil',
  templateUrl: './registrar-perfil.component.html',
  styleUrls: ['./registrar-perfil.component.scss']
})
export class RegistrarPerfilComponent implements OnInit {

  public formularioRegistrarPerfil: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    modulos: new FormControl(null, [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioModificacionPerfil: FormGroup = new FormGroup({
    guidPerfil: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    modulos: new FormControl(null, [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioActual: FormGroup;
  public parametrosRuta: any = {};
  public datosSesion: any;
  public listaModulos: any = [];
  public itemSize: any;

  constructor(public perfilService: PerfilService,
    public moduloService: ModuloService,
    public alertService: AlertaService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.parametrosRuta.datosPerfil = this.router.getCurrentNavigation()?.extras?.state?.datosPerfil;
    this.parametrosRuta.modificacion = this.parametrosRuta?.datosPerfil ? true : false;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));

    if (this.parametrosRuta.modificacion) {
      this.formularioActual = this.formularioModificacionPerfil;
      this.asignarValoresModificacion();
    } else {
      this.listarModulos();
      this.formularioActual = this.formularioRegistrarPerfil;
    }
  }

  public get formulario(): any {
    return this.formularioActual.controls
  }

  private asignarValoresModificacion(): void {
    this.spinner.show();
    this.moduloService.listarModulos().subscribe((result: any) => {
      this.spinner.hide();
      if (result?.resultadoList != null) {
        this.listaModulos = result.resultadoList;
        this.formulario.guidPerfil.setValue(this.parametrosRuta.datosPerfil.guid_perfil);
        this.formulario.nombre.setValue(this.parametrosRuta.datosPerfil.nombre);
        this.formulario.descripcion.setValue(this.parametrosRuta.datosPerfil.descripcion);
        this.formulario.modulos.setValue(this.parametrosRuta.datosPerfil.modulos);
        this.formulario.habilitar.setValue(this.parametrosRuta.datosPerfil.estado);
        this.formularioActual.updateValueAndValidity();
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Modulos', 'Se presentan problemas al listar los modulos, por favor intente nuevamente.');
      throw (error);
    });
  }

  public listarModulos(): void {
    this.spinner.show();
    this.moduloService.listarModulos().subscribe((result: any) => {
      this.spinner.hide();
      if (result?.resultadoList != null) {
        this.listaModulos = result.resultadoList;
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al listar Modulos', 'Se presentan problemas al listar los modulos, por favor intente nuevamente.');
      throw (error);
    });
  }

  public agregarPerfil(controles: any): void {
    debugger
    let datos: IRegistrarPerfil = {
      nombrePerfil: controles.nombre.value,
      descripcionPerfil: controles.descripcion.value,
      modulos: controles.modulos.value,
      usuarioCreacion: this.datosSesion?.usuarioAvexInfo?.usuario,
      estado: controles.habilitar.value
    };
    this.spinner.show();
    this.perfilService.registrarPerfil({ parametro: datos }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.formularioActual.reset();
        this.formulario.habilitar.setValue(true);
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Registro de Perfil', 'Perfil registrado exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al registrar Perfil', 'Se presentan problemas al realizar el registro de perfil, por favor intente nuevamente.');
      throw (error);
    })
  }

  public modificarPerfil(controles: any): void {
    let body: IModificarPerfil = {
      guidPerfil: controles.guidPerfil.value,
      nombrePerfil: controles.nombre.value,
      descripcionPerfil: controles.descripcion.value,
      modulos: controles.modulos.value,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.usuario,
      estado: controles.habilitar.value
    }
    this.spinner.show();
    this.perfilService.modificarPerfil({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Perfil', 'Perfil modificado exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Perfil', 'Se presentan problemas al realizar la modificacion del perfil, por favor intente nuevamente.');
      throw (error);
    })
  }
}
