import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './compartido/components/not-found/not-found.component';

const routes: Routes = [
  {
   path: '',
   pathMatch: 'full',
   redirectTo: 'inicio-sesion' 
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./publica/publica.module').then(m => m.PublicaModule)
  },
  {
    path: 'privada',
    loadChildren: ()=> import ('./privada/privada.module').then(m => m.PrivadaModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
