import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampanaService, DivipolaService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
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
    direccion: new FormControl('', [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  public formularioModificacionCategoria: FormGroup = new FormGroup({
    guid: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    detalleDireccion: new FormControl('', [Validators.required]),
    telefono: new FormControl(null, [Validators.required]),
    habilitar: new FormControl(true, [Validators.required])
  });

  
  public formularioActual: FormGroup;

  public parametrosRuta: any = {};
  public datosSesion: any;
  public listDepartamentos: { [index: string]: string }[];
  public listMunicipios: { [index: string]: string }[];
  constructor(
    public metodosComunes: MetodosComunesService,
    public campanaService: CampanaService,
    public alertService: AlertaService,
    private spinner: NgxSpinnerService,
    private router: Router) {
      this.parametrosRuta.datosCategoria = this.router.getCurrentNavigation()?.extras?.state?.usuario;
      this.parametrosRuta.modificacion = this.parametrosRuta?.datosCampana ? true : false;
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
    this.formulario.departamento.setValue(this.parametrosRuta.datosCampana.departamento);
    this.formulario.municipio.setValue(this.parametrosRuta.datosCampana.municipio);
    this.formulario.nombre.setValue(this.parametrosRuta.datosCampana.nombre);
    this.formulario.direccion.setValue(this.parametrosRuta.datosCampana.direccion);
    this.formulario.detalleDireccion.setValue(this.parametrosRuta.datosCampana.detalleDireccion);
    this.formulario.telefono.setValue(this.parametrosRuta.datosCampana.telefono);
    this.formulario.habilitar.setValue(this.parametrosRuta.datosUsuario.estado);
    this.formularioActual.updateValueAndValidity();
  }

}
