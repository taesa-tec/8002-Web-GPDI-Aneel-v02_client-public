import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {ConfiguracaoComponent} from '@app/user-suprimento/captacoes/captacao/configuracao/configuracao.component';
import {DetalhesComponent} from '@app/user-suprimento/captacoes/captacao/detalhes/detalhes.component';
import {PropostasComponent} from '@app/user-suprimento/captacoes/captacao/propostas/propostas.component';
import {ContratosPadroesResolver} from '@app/resolvers/contratos-padroes.resolver';
import {FornecedoresResolver} from '@app/resolvers/fornecedores.resolver';
import {PropostasResolver} from '@app/user-suprimento/resolvers/propostas.resolver';
import {ListComponent} from '@app/user-suprimento/captacoes/captacao/propostas/list.component';


const routes: Routes = [
  {
    path: '',
    component: CaptacaoComponent,
    children: [
      {
        path: '',
        redirectTo: 'detalhes'
      },
      {
        path: 'detalhes',
        component: DetalhesComponent
      },
      {
        path: 'configuracao',
        component: ConfiguracaoComponent,
        resolve: {
          contratos: ContratosPadroesResolver,
          fornecedores: FornecedoresResolver
          // arquivos,
        }
      },
      {
        path: 'propostas',
        component: PropostasComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'pendente'},
          {
            path: ':status',
            component: ListComponent,
            resolve: {
              propostas: PropostasResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptacaoRoutingModule {
}
