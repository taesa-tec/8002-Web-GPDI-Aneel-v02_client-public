import {NgModule} from '@angular/core';
import {Routes, RouterModule, UrlSegment} from '@angular/router';
import {DemandaComponent} from './demanda.component';
import {EquipeValidacaoComponent} from './equipe-validacao/equipe-validacao.component';
import {AprovacaoComponent} from './aprovacao/aprovacao.component';
import {FormEditorComponent} from '@app/pages/demandas/demanda/form-editor/form-editor.component';
import {DemandaResolver} from '@app/pages/demandas/demanda/demanda.resolver';
import {DemandaGuard} from '@app/pages/demandas/demanda/guards/demanda.guard';
import {DemandaLogsComponent} from '@app/pages/demandas/demanda/demanda-logs/demanda-logs.component';
import {IndexComponent} from '@app/pages/demandas/demanda/index.component';
import {EquipePedResolver} from '@app/resolvers/equipe-ped.resolver';

const routes: Routes = [
  {
    //path: ':id',
    matcher: (url: UrlSegment[]) => url.length > 0 && url[0].path.match(/^\d+$/) ? ({consumed: [url[0]], posParams: {id: url[0]}}) : null,
    component: DemandaComponent,
    canActivate: [DemandaGuard],
    resolve: {
      demanda: DemandaResolver,
      equipe: EquipePedResolver
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'equipe-validacao',
        component: EquipeValidacaoComponent
      },
      {
        path: 'formulario/:form',
        component: FormEditorComponent,
      },
      {
        path: 'documento-aprovacoes',
        redirectTo: 'aprovacao'
        //component: DocumentoAprovacoesComponent
      },
      {
        path: 'aprovacao',
        component: AprovacaoComponent
      },
      {
        path: 'historico',
        component: AprovacaoComponent
      },
      {
        path: 'central-administrativa',
        loadChildren: () => import('@app/pages/demandas/demanda/central-administrativa/central-administrativa.module')
          .then(m => m.CentralAdministrativaModule)
      },
      {
        path: 'logs',
        component: DemandaLogsComponent
      },
      {
        path: '**',
        component: IndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class DemandaRoutingModule {
}
