import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuprimentosComponent } from './suprimentos.component';

const routes: Routes = [
  {
    path: ':id',
    component: SuprimentosComponent,
    children: [
      {
        path: '',
        redirectTo: 'proposta',
        pathMatch: 'full'
      },
      {
        path: 'proposta',
        loadChildren: () => import('@app/dashboard/suprimentos/proposta/proposta.module').then(m => m.PropostaModule)
      },
      {
        path: 'iniciado',
        loadChildren: () => import('@app/dashboard/suprimentos/iniciado/iniciado.module').then(m => m.IniciadoModule)
      },
      {
        path: 'encerrado',
        loadChildren: () => import('@app/dashboard/suprimentos/encerrado/encerrado.module').then(m => m.EncerradoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuprimentosRoutingModule { }
