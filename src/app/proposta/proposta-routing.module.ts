import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PropostaComponent} from './proposta.component';
import {PropostaResolver} from '@app/proposta/resolvers/proposta.resolver';

const GUIDREG = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
const routes: Routes = [
  {
    matcher: (segments => {
      if (segments.length > 0) {
        const guid = segments[0].path; // guid da proposta
        if (GUIDREG.test(guid)) {
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
      {
        path: 'detalhes',
        loadChildren: () => import('./pages/01-detalhes-demanda/detalhes-demanda.module').then(m => m.DetalhesDemandaModule)
      },
      {path: 'condicoes', loadChildren: () => import('./pages/02-condicoes/condicoes.module').then(m => m.CondicoesModule)},
      {path: 'entidades', loadChildren: () => import('./pages/03-co-executores/co-executores.module').then(m => m.CoExecutoresModule)},
      {
        path: 'contrato',
        loadChildren: () => import('./pages/04-validacao-contratos/validacao-contratos.module').then(m => m.ValidacaoContratosModule)
      },
      //*
      {
        path: 'plano-de-trabalho', loadChildren: () => import('./pages/05-plano-trabalho/plano-trabalho.module')
          .then(m => m.PlanoTrabalhoModule)
      },
      {path: 'escopo', loadChildren: () => import('./pages/08-escopo/escopo.module').then(m => m.EscopoModule)},
      {path: 'produtos', loadChildren: () => import('./pages/06-produtos/produtos.module').then(m => m.ProdutosModule)},
      {path: 'etapas', loadChildren: () => import('./pages/07-etapas/etapas.module').then(m => m.EtapasModule)},
      {path: 'riscos', loadChildren: () => import('./pages/09-riscos/riscos.module').then(m => m.RiscosModule)},
      {
        path: 'recursos-humanos',
        loadChildren: () => import('./pages/10-recursos-humanos/recursos-humanos.module').then(m => m.RecursosHumanosModule)
      },
      {
        path: 'alocacao-recursos-humanos',
        loadChildren: () => import('./pages/11-alocacao-recursos-humanos/alocacao-recursos-humanos.module')
          .then(m => m.AlocacaoRecursosHumanosModule)
      },
      {
        path: 'recursos-materiais',
        loadChildren: () => import('./pages/12-recursos-materiais/recursos-materiais.module').then(m => m.RecursosMateriaisModule)
      },
      {
        path: 'alocacao-recursos-materiais',
        loadChildren: () => import('./pages/13-alocacao-recursos-materiais/alocacao-recursos-materiais.module')
          .then(m => m.AlocacaoRecursosMateriaisModule)
      },
      {
        path: 'envio',
        loadChildren: () => import('./pages/99-envio-proposta/envio-proposta.module')
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
