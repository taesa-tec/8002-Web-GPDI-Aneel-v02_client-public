import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjetoComponent} from '@app/projetos/projeto/projeto.component';
import {ProjetoResolver} from '@app/projetos/projeto/resolvers/projeto.resolver';
import {ExtratoFinanceiroComponent} from '@app/projetos/projeto/extrato-financeiro/extrato-financeiro.component';
import {ExtratoFinanceiroResolver} from '@app/projetos/projeto/resolvers/extrato-financeiro.resolver';
import {NotFoundComponent} from '@app/core/screens/not-found.component';

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
        redirectTo: 'refp'
      },
      {
        path: 'refp',
        loadChildren: () => import('./refp/refp.module').then(m => m.RefpModule)
      },
      {
        path: 'extrato',
        component: ExtratoFinanceiroComponent,
        resolve: {
          extrato: ExtratoFinanceiroResolver
        }
      },
      {
        path: 'alteracoes',
        loadChildren: () => import('./alterar-projeto/alterar-projeto.module').then(m => m.AlterarProjetoModule)
      },
      {
        path: 'consulta',
        loadChildren: () => import('./consultar-planejamento/consultar-planejamento.module').then(m => m.ConsultarPlanejamentoModule)
        // component: ConsultaPlanejamentoComponent
      },
      {
        path: 'central-administrativa',
        loadChildren: () => import('./administrativo/administrativo.module').then(m => m.AdministrativoModule)
        // component: ConsultaPlanejamentoComponent
      },
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
