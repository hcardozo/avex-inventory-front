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
      },
      {
        path: 'campanas',
        loadChildren: () => import('./modules/campana/campana.module').then(m => m.CampanaGuiModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./modules/categoria/categoria.module').then(m => m.CategoriaGuiModule)
      },
      {
        path: 'marcas',
        loadChildren: () => import('./modules/marca/marca.module').then(m => m.MarcaGuiModule)
      },
      {
        path: 'perfiles',
        loadChildren: () => import('./modules/perfil/perfil.module').then(m => m.PerfilGuiModule)
      },
      {
        path: 'equipos',
        loadChildren: () => import('./modules/equipo/equipo.module').then(m => m.EquipoGuiModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./modules/reporte/reporte.module').then(m => m.ReporteGuiModule)
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivadaRoutingModule { }
