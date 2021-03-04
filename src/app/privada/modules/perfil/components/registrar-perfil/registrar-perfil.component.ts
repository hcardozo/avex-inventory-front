import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-registrar-perfil',
  templateUrl: './registrar-perfil.component.html',
  styleUrls: ['./registrar-perfil.component.scss']
})
export class RegistrarPerfilComponent implements OnInit {

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

  constructor(public perfilService: PerfilService,
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
    this.formulario.habilitar.setValue(this.parametrosRuta.datosMarca.estado);
    this.formularioActual.updateValueAndValidity();
  }

}
