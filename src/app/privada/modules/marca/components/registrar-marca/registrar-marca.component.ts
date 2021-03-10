import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IModificarMarca, IRegistrarMarca, MarcaService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-registrar-marca',
  templateUrl: './registrar-marca.component.html',
  styleUrls: ['./registrar-marca.component.scss']
})
export class RegistrarMarcaComponent implements OnInit {

  public formularioRegistrarMarca: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioModificacionMarca: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required]),
    guidMarca: new FormControl('', [Validators.required])
  });

  public formularioActual: FormGroup;

  public parametrosRuta: any = {};
  public datosSesion: any;
  constructor(
    public marcaService: MarcaService,
    public alertService: AlertaService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.parametrosRuta.datosMarca = this.router.getCurrentNavigation()?.extras?.state?.datosMarca;
    this.parametrosRuta.modificacion = this.parametrosRuta?.datosMarca ? true : false;
  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    if (this.parametrosRuta.modificacion) {
      this.formularioActual = this.formularioModificacionMarca;
      this.asignarValoresModificacion();
    } else {
      this.formularioActual = this.formularioRegistrarMarca;
    }
  }

  public get formulario(): any {
    return this.formularioActual.controls
  }

  private asignarValoresModificacion(): void {
    this.formulario.nombre.setValue(this.parametrosRuta.datosMarca.nombre);
    this.formulario.guidMarca.setValue(this.parametrosRuta.datosMarca.guidMarca);
    this.formulario.habilitar.setValue(this.parametrosRuta.datosMarca.estado);
    this.formularioActual.updateValueAndValidity();
  }

  
  public registrarMarca(controles: any): void {
    let body: IRegistrarMarca = {
      usuarioCreacion: this.datosSesion?.usuarioAvexInfo?.usuario,
      nombre: controles.nombre.value,
      estado: controles.habilitar.value
    }
    this.spinner.show();
    this.marcaService.registrarMarca({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.formularioActual.reset();
        this.formulario.habilitar.setValue(true);
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Registro de Marca', 'Marca registrada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al registrar Marca', 'Se presentan problemas al realizar el registro de la marca, por favor intente nuevamente.');
      throw (error);
    })
  }
  public modificarMarca(controles: any): void {
    let body: IModificarMarca = {
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.usuario,
      guidMarca: controles.guidMarca.value,
      nombre: controles.nombre.value,
      estado: controles.habilitar.value
    }
    console.log(body)
    this.spinner.show();
    this.marcaService.modificarMarca({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Marca', 'Marca modificada exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Marca', 'Se presentan problemas al realizar la modificacion de la Marca, por favor intente nuevamente.');
      throw (error);
    })
  }
  
}
