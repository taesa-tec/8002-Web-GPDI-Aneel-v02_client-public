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
  },
  {
    path: 'capacitacao',
    loadChildren: () => import('./capacitacao/capacitacao.module').then(m => m.CapacitacaoModule)
  },
  {
    path: 'cientifica',
    loadChildren: () => import('./producao-cientifica/producao-cientifica.module').then(m => m.ProducaoCientificaModule)
  },
  {
    path: 'apoio',
    loadChildren: () => import('./apoio/apoio.module').then(m => m.ApoioModule)
  },
  {
    path: 'intelectual',
    loadChildren: () => import('./propriedade-intelectual/propriedade-intelectual.module').then(m => m.PropriedadeIntelectualModule)
  },
  {
    path: 'socioambientais',
    loadChildren: () => import('./socioambientais/socioambientais.module').then(m => m.SocioambientaisModule)
  },
  {
    path: 'economicos',
    loadChildren: () => import('./economicos/economicos.module').then(m => m.EconomicosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }
