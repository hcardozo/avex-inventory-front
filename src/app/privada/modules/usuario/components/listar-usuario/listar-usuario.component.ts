import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IEliminarUsuario, UsuarioService } from 'avex-api';
import { ICambiarEstadoUsuario } from 'avex-api';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { MetodosComunesService } from 'src/app/compartido/services/metodosComunes/metodos-comunes.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private metodosComunes: MetodosComunesService,
    private alertService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  public listaUsuarios: any[] = [];
  public checked: boolean = true;

  public datosSesion: any;

  ngOnInit(): void {
    this.datosSesion = JSON.parse(localStorage.getItem(USER_SESION_KEY));
    this.usuarioService.listarUsuarios().subscribe((resultado: any) => {
      if (resultado?.resultadoList) {
        this.listaUsuarios = resultado.resultadoList;
      }
    })
  }

  public cambiarEstado(event: any, usuario: any) {
    let body: ICambiarEstadoUsuario = {
      guid: usuario.guid,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre,
      fechaModificacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    this.usuarioService.cambiarEstadoUsuario({ parametro: body }).subscribe(() => { }, (error: any) => {
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al actualizar Usuario', 'Se presentan problemas al realizar actualizacion de estado de usuario, por favor intente nuevamente.');
      throw (error);
    })
  }

  public modificarUsuario(usuario: any): void {
    let navigationExtas: NavigationExtras = {
      state: {
        usuario
      },
      relativeTo: this.activatedRoute.parent
    }
    this.router.navigate([`./registrarUsuario`], navigationExtas);
  }

  public eliminarUsuario(usuario: any): void {
    let body: IEliminarUsuario = {
      usuarioCreacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      fechaCreacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      guid: usuario.guid,
      usuarioModificacion: this.datosSesion?.usuarioAvexInfo?.nombre,
      fechaModificacion: this.metodosComunes.obtenerFecha(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    let indexUsuario: number = this.listaUsuarios.findIndex(item => item.guid == usuario.guid);
    this.listaUsuarios.splice(indexUsuario, 1);
    this.usuarioService.eliminarUsuario({ parametro: body }).subscribe((response: any) => {
      if (response?.resultado.resultado) {
        this.alertService.mostrarNotificacion(ETipoAlerta.EXITOSA, 'Usuario Eliminado', 'Usuario eliminado de manera correcta.');
      }

    }, (error: any) => {
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al eliminar Usuario', 'Se presentan problemas al realizar eliminacion de usuario, por favor intente nuevamente.');
      throw (error);
    })
  }

}
