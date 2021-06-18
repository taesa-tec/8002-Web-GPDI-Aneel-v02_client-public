import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ConsultarPlanejamentoComponent} from '@app/pages/projetos/projeto/consultar-planejamento/consultar-planejamento.component';
import {ArquivoComponent} from '@app/pages/projetos/projeto/consultar-planejamento/arquivo.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultarPlanejamentoComponent,
    children: [
      {
        path: '',
        redirectTo: 'plano-trabalho',
        pathMatch: 'full'
      },
      {
        path: 'plano-trabalho',
        component: ArquivoComponent,
        resolve: {
          url: 'planoTrabalho'
        }
      },
      {
        path: 'contrato',
        component: ArquivoComponent,
        resolve: {
          url: 'contrato'
        }
      },
      {
        path: 'especificacao-tecnica',
        component: ArquivoComponent,
        resolve: {
          url: 'especificacaoTecnica'
        }

      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultarPlanejamentoRoutingModule {
}
