import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelDemandasComponent } from './painel-demandas.component';
import { ProjetoIniciadoComponent } from './projeto-iniciado/projeto-iniciado.component';
import { ProjetoEmPropostaComponent } from './projeto-em-proposta/projeto-em-proposta.component';
import { ProjetoEncerradoComponent } from './projeto-encerrado/projeto-encerrado.component';

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
      {
        path: 'gestao-de-demandas',
        loadChildren: '@app/dashboard/painel-demandas/gestao-de-demandas/gestao-de-demandas.module#GestaoDeDemandasModule'
      },
      {
        path: 'configuracoes-do-sistema',
        loadChildren: '@app/dashboard/painel-demandas/configuracoes-sistema/configuracoes-sistema.module#ConfiguracoesSistemaModule'
      },
      {
        path: 'projeto-proposta',
        component: ProjetoEmPropostaComponent
      },
      {
        path: 'projeto-iniciado',
        component: ProjetoIniciadoComponent
      },
      {
        path: 'projeto-encerrado',
        component: ProjetoEncerradoComponent
      }
    ]
  },
  
  {
    path: 'demanda',
    loadChildren: '@app/dashboard/painel-demandas/demanda/demanda.module#DemandaModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelDemandasRoutingModule { }
