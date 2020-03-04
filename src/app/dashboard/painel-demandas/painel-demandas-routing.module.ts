import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelDemandasComponent } from './painel-demandas.component';


const routes: Routes = [
  {
    path: '',
    component: PainelDemandasComponent,
    children: [
      {
        path: '',
        redirectTo: 'gestao-de-demandas',
        pathMatch: 'full'
      },
    ]
  },

  {
    path: 'demanda',
    loadChildren: () => import('@app/dashboard/painel-demandas/demanda/demanda.module').then(m => m.DemandaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelDemandasRoutingModule { }
