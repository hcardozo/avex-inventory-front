import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MaestroComponent } from './components/maestro/maestro.component';

const routes: Routes = [
  {
    path: '',
    component: MaestroComponent,
    children:[
      {
        path:'',
        redirectTo: 'inicio'
      },
      {
        path:'inicio',
        component: InicioComponent
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioGuiModule)
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivadaRoutingModule { }
