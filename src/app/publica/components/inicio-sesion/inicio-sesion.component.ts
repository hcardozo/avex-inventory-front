import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'avex-api';
import { USER_SESION_KEY } from 'src/environments/constantes';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  public inicioSesionGroup: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
  }

  public iniciarSesion(): void {
    this.usuarioService.validarUsuario({
      parametro: {
        usuario: this.inicioSesionGroup.controls.nombre.value,
        contrasena: this.inicioSesionGroup.controls.clave.value
      }
    }).subscribe((value: any) => {
      if (value && value.resultado) {
        localStorage.setItem(USER_SESION_KEY, JSON.stringify(value.resultado))
        this.router.navigate(['privada']);
      }
    })

  }

}
