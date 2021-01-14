import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroComponent } from './components/maestro/maestro.component';

const routes: Routes = [
  {
    path: '',
    component: MaestroComponent,
    children:[
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule)
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivadaRoutingModule { }
