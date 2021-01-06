import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public iniciarSesion() {
    console.log(this.inicioSesionGroup.controls);
    this.router.navigate(['privada/inicio'])

  }

}