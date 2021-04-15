import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PropostaComponent} from './proposta.component';
import {PropostaResolver} from '@app/proposta/resolvers/proposta.resolver';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {PropostasResolver} from '@app/proposta/resolvers/propostas.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SidebarComponent,
    resolve: {
      propostas: PropostasResolver
    }
  },
  {
    matcher: (segments => {
      if (segments.length > 0) {
        const id = parseFloat(segments[0].path); // Id da captação, não da proposta
        if (!isNaN(id)) {
          return {
            consumed: [segments[0]], posParams: {id: segments[0]}
          };
        }
      }
      return null;
    }),
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
    resolve: {
      proposta: PropostaResolver
    },
    component: PropostaComponent,
    children: [
      {path: 'detalhes', loadChildren: () => import('./01-detalhes-demanda/detalhes-demanda.module').then(m => m.DetalhesDemandaModule)},
      /*
      {path: 'condicoes', loadChildren: () => import('./02-condicoes/condicoes.module').then(m => m.CondicoesModule)},
      {path: 'entidades', loadChildren: () => import('./03-co-executores/co-executores.module').then(m => m.CoExecutoresModule)},
      {
        path: 'contrato',
        loadChildren: () => import('./04-validacao-contratos/validacao-contratos.module').then(m => m.ValidacaoContratosModule)
      },
      {path: 'plano-de-trabalho', loadChildren: () => import('./05-plano-trabalho/plano-trabalho.module').then(m => m.PlanoTrabalhoModule)},
      {path: 'escopo', loadChildren: () => import('./08-escopo/escopo.module').then(m => m.EscopoModule)},
      {path: 'produtos', loadChildren: () => import('./06-produtos/produtos.module').then(m => m.ProdutosModule)},
      {path: 'etapas', loadChildren: () => import('./07-etapas/etapas.module').then(m => m.EtapasModule)},
      {path: 'riscos', loadChildren: () => import('./09-riscos/riscos.module').then(m => m.RiscosModule)},
      {
        path: 'recursos-humanos',
        loadChildren: () => import('./10-recursos-humanos/recursos-humanos.module').then(m => m.RecursosHumanosModule)
      },
      {
        path: 'alocacao-recursos-humanos',
        loadChildren: () => import('./11-alocacao-recursos-humanos/alocacao-recursos-humanos.module')
          .then(m => m.AlocacaoRecursosHumanosModule)
      },
      {
        path: 'recursos-materiais',
        loadChildren: () => import('./12-recursos-materiais/recursos-materiais.module').then(m => m.RecursosMateriaisModule)
      },
      {
        path: 'alocacao-recursos-materiais',
        loadChildren: () => import('./13-alocacao-recursos-materiais/alocacao-recursos-materiais.module')
          .then(m => m.AlocacaoRecursosMateriaisModule)
      },
      {
        path: 'envio',
        loadChildren: () => import('./99-envio-proposta/envio-proposta.module')
          .then(m => m.EnvioPropostaModule)
      },
      // */
      {path: '**', redirectTo: 'detalhes', pathMatch: 'full'}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostaRoutingModule {
}
