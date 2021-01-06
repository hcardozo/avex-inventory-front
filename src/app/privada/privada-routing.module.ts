import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroComponent } from './components/maestro/maestro.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: MaestroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivadaRoutingModule { }
