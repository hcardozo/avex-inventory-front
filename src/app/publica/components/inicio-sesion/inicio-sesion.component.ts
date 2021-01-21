import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'avex-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorClass } from 'src/app/compartido/clases/error.class';
import { ETipoAlerta } from 'src/app/compartido/enums/tipo-alerta.enum';
import { AlertaService } from 'src/app/compartido/services/alerta/alerta.service';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
  providers: [MessageService]
})
export class InicioSesionComponent implements OnInit {

  public inicioSesionGroup: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    public alertService: AlertaService
  ) {
  }

  ngOnInit(): void {
   
  }
  
  public iniciarSesion(): void {
    this.spinner.show();
    this.usuarioService.validarUsuario({
      parametro: {
        usuario: this.inicioSesionGroup.controls.nombre.value,
        contrasena: this.inicioSesionGroup.controls.clave.value
      }
    }).subscribe((value: any) => {
      this.spinner.hide();
      if (value && value.resultado) {
        localStorage.setItem(USER_SESION_KEY, JSON.stringify(value.resultado));
        this.router.navigate(['privada']);
      } else {
        debugger;
        this.alertService.mostrarNotificacion(ETipoAlerta.ALERTA, 'Acceso Denegado', value.mensaje);

      }
    }, (error: any) => {
      this.alertService.mostrarNotificacion(ETipoAlerta.ERROR, 'Error al iniciar sesion', 'Se presentan problemas al realizar el inicio de sesion, por favor intente nuevamente.');
      throw (error);
    })

  }

}
