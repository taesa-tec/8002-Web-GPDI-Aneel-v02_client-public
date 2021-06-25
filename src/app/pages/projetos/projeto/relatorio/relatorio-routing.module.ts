import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalComponent } from './final/final.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'final'
  },
  {
    path: 'final',
    component: FinalComponent
  },
  {
    path: 'etapa',
    loadChildren: () => import('./etapas/etapas.module').then(m => m.EtapasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
