import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GestaoDeDemandasComponent} from './demandas.component';
import {DemandasListComponent} from './demandas-list/demandas-list.component';
import {DemandaEtapaStatus} from './commons';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: GestaoDeDemandasComponent,
        children: [
          {
            path: '',
            redirectTo: 'elaboracao',
            pathMatch: 'full',
          },
          {
            path: 'elaboracao',
            component: DemandasListComponent,
            data: {
              demandaEtapaStatus: DemandaEtapaStatus.EmElaboracao
            }
          },
          {
            path: 'reprovadas',
            component: DemandasListComponent,
            data: {
              demandaEtapaStatus: DemandaEtapaStatus.Reprovada
            }
          },
          {
            path: 'aprovadas',
            component: DemandasListComponent,
            data: {
              demandaEtapaStatus: DemandaEtapaStatus.Aprovada
            }
          },
          {
            path: 'enviadas-para-captacao',
            component: DemandasListComponent,
            data: {
              demandaEtapaCaptacao: true
            }
          },
        ],
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandasRoutingModule {
}
