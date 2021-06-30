import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjetoComponent} from '@app/pages/projetos/projeto/projeto.component';
import {ProjetoResolver} from '@app/pages/projetos/projeto/resolvers/projeto.resolver';
import {ExtratoFinanceiroComponent} from '@app/pages/projetos/projeto/extrato-financeiro/extrato-financeiro.component';
import {ExtratoFinanceiroResolver} from '@app/pages/projetos/projeto/resolvers/extrato-financeiro.resolver';
import {NotFoundComponent} from '@app/core/screens/not-found.component';
import {HomeComponent} from '@app/pages/projetos/projeto/home/home.component';
import {DebugComponent} from '@app/core/screens/debug.component';

const routes: Routes = [
  {
    matcher: (segments => {
      if (segments.length > 0) {
        const id = parseFloat(segments[0].path);
        if (!isNaN(id)) {
          return {
            consumed: [segments[0]], posParams: {id: segments[0]}
          };
        }
      }
      return null;
    }),
    component: ProjetoComponent,
    resolve: {
      projeto: ProjetoResolver,
    },
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'refp',
        resolve: {
          status: 'projetoExecucao'
        },
        loadChildren: () => import('./refp/refp.module').then(m => m.RefpModule)
      },
      {
        path: 'extrato',
        canActivate: ['isGestor'],
        component: ExtratoFinanceiroComponent,
        resolve: {
          status: 'projetoExecucao',
          extrato: ExtratoFinanceiroResolver
        }
      },
      {

        path: 'alteracoes',
        canActivate: ['isGestor'],
        loadChildren: () => import('./alterar-projeto/alterar-projeto.module').then(m => m.AlterarProjetoModule)
      },
      {
        path: 'consulta',
        loadChildren: () => import('./consultar-planejamento/consultar-planejamento.module').then(m => m.ConsultarPlanejamentoModule)
      },
      {
        path: 'central-administrativa',
        canActivate: ['isAdmin'],
        loadChildren: () => import('./administrativo/administrativo.module').then(m => m.AdministrativoModule)
      },
      {
        path: 'relatorio',
        canActivate: ['isGestor'],
        resolve: {
          status: 'projetoFinalizado'
        },
        loadChildren: () => import('./relatorio/relatorio.module').then(m => m.RelatorioModule)
      },

      //
      {
        path: 'notfound',
        component: NotFoundComponent
      },
      {
        path: '**',
        redirectTo: 'notfound'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule {
}
