import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IModificarUsuario, IRegistrarUsuario, PerfilService, TipoDocumentoService, UsuarioService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  public formularioRegistrarUsuario: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
    confirmacionClave: new FormControl('', [Validators.required]),
    nombreCompleto: new FormControl('', [Validators.required]),
    tipoDeDocumento: new FormControl(null, [Validators.required]),
    numeroIdentificacion: new FormControl('', [Validators.required]),
    correoCorporativo: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,3}'))]),
    confirmacionCorreoCorporativo: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,3}'))]),
    telefono: new FormControl('', [Validators.required]),
    perfil: new FormControl( null, [Validators.required]),
    habilitar: new FormControl(true, [Validators.required]),
  });

  public formularioModificacionUsuario: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    guid: new FormControl('', [Validators.required]),
    nombreCompleto: new FormControl('', [Validators.required]),
    tipoDeDocumento: new FormControl(null, [Validators.required]),
    numeroIdentificacion: new FormControl('', [Validators.required]),
    correoCorporativo: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,3}'))]),
    telefono: new FormControl('', [Validators.required]),
    perfil: new FormControl(null, [Validators.required]),
    habilitar: new FormControl(true, [Validators.required]),
  });

  public formularioActual: FormGroup;

  public parametrosRuta: any = {};
  public datosSesion: any;
  public listTipoDocumento: { [index: string]: string }[];
  public listPerfil: { [index: string]: string }[];

  constructor(
    public formBuilder: FormBuilder,
    public metodosComunes: MetodosComunesService,
    public usuarioService: UsuarioService,
    public alertService: AlertaService,
    public tipoDocumento:TipoDocumentoService,
    public perfiles: PerfilService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.parametrosRuta.datosUsuario = this.router.getCurrentNavigation()?.extras?.state?.usuario;
    this.parametrosRuta.modificacion = this.parametrosRuta?.datosUsuario ? true : false;

  }

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    this.tipoDocumento.listarTiposDocumento().subscribe((response:any)=>{
      this.listTipoDocumento = response.tipoMensaje == 0 ? response.resultadoList : null;
    });
    this.perfiles.listarPerfilLite().subscribe((response: any) => {
      this.listPerfil = response.tipoMensaje == 0 ? response.resultadoList : null;
    });
    if (this.parametrosRuta.modificacion) {
      this.formularioActual = this.formularioModificacionUsuario;
      this.asignarValoresModificacion();
    } else {
      this.formularioActual = this.formularioRegistrarUsuario;
    }
  }

  public get formulario(): any {
    return this.formularioActual.controls
  }

  public crearContrasena(): void {
    let nuevaContraseña: string = this.metodosComunes.generarContrasenaAleatoria(8);
    this.formularioRegistrarUsuario.controls.clave.setValue(nuevaContraseña);
    this.formularioRegistrarUsuario.controls.confirmacionClave.setValue(nuevaContraseña);
    this.formularioRegistrarUsuario.updateValueAndValidity();
  }

  public agregarUsuario(controles: any): void {
    let datos: IRegistrarUsuario = {
      usuario: controles.usuario.value,
      contrasena: controles.clave.value,
      confirmarContrasena: controles.confirmacionClave.value,
      nombre: controles.nombreCompleto.value,
      tipo_documento: controles.tipoDeDocumento.value,
      documento: controles.numeroIdentificacion.value,
      email: controles.correoCorporativo.value,
      telefono: controles.telefono.value,
      guidPerfil: controles.perfil.value,
      usuarioCreacion: this.datosSesion?.usuarioAvexInfo?.nombre,
      estado:controles.habilitar.value  
    };
    this.spinner.show();
    this.usuarioService.registrarUsuario({ parametro: datos }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.formularioActual.reset();
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Registro de Usuario', 'Usuario registrado exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al registrar Usuario', 'Se presentan problemas al realizar el registro de usuario, por favor intente nuevamente.');
      throw (error);
    })
  }

  private asignarValoresModificacion(): void {
    this.formulario.usuario.setValue(this.parametrosRuta.datosUsuario.usuario);
    this.formulario.guid.setValue(this.parametrosRuta.datosUsuario.guid);
    this.formulario.nombreCompleto.setValue(this.parametrosRuta.datosUsuario.nombre);
    this.formulario.tipoDeDocumento.setValue(this.parametrosRuta.datosUsuario.tipo_documento);
    this.formulario.numeroIdentificacion.setValue(this.parametrosRuta.datosUsuario.documento);
    this.formulario.correoCorporativo.setValue(this.parametrosRuta.datosUsuario.email);
    this.formulario.telefono.setValue(this.parametrosRuta.datosUsuario.telefono);
    this.formulario.perfil.setValue(this.parametrosRuta.datosUsuario.guidPerfil);
    this.formulario.habilitar.setValue(this.parametrosRuta.datosUsuario.estado);
    this.formularioActual.updateValueAndValidity();
  }

  public modificarUsuario(controles: any): void {
    let body: IModificarUsuario = {
      guid: controles.guid.value,
      nombre: controles.nombreCompleto.value,
      tipo_documento: controles.tipoDeDocumento.value,
      documento: controles.numeroIdentificacion.value,
      email: controles.correoCorporativo.value,
      telefono: controles.telefono.value,
      guidPerfil: controles.perfil.value,
      estado: controles.habilitar.value,
      usuarioModificacion: this.datosSesion.usuarioAvexInfo.usuario
    }
    this.spinner.show();
    this.usuarioService.modificarUsuario({ parametro: body }).subscribe((response: any) => {
      this.spinner.hide();
      if (response?.resultado?.resultado === true) {
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Modificacion de Usuario', 'Usuario modificado exitosamente.')
      }
    }, (error: any) => {
      this.spinner.hide();
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al modificar Usuario', 'Se presentan problemas al realizar la modificacion de usuario, por favor intente nuevamente.');
      throw (error);
    })
  }
}
