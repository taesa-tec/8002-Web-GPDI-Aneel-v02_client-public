import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GestaoDeDemandasComponent} from './demandas.component';
import {DemandasListComponent} from './demandas-list/demandas-list.component';
import {DemandaEtapaStatus} from './commons';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {EquipePedResolver} from '@app/resolvers';
import {DemandasResolver} from '@app/pages/demandas/resolvers/demandas.resolver';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: GestaoDeDemandasComponent,
        resolve: {
          equipe: EquipePedResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'elaboracao',
            pathMatch: 'full',
          },
          {
            path: 'elaboracao',
            component: DemandasListComponent,
            runGuardsAndResolvers: (from, to) => {
              return from.fragment === 'novo';
            },
            resolve: {
              demandas: DemandasResolver
            },
            data: {
              demandaEtapaStatus: DemandaEtapaStatus.EmElaboracao
            }
          },
          {
            path: 'reprovadas',
            component: DemandasListComponent,
            resolve: {
              demandas: DemandasResolver
            },
            data: {
              demandaEtapaStatus: DemandaEtapaStatus.Reprovada
            }
          },
          {
            path: 'aprovadas',
            component: DemandasListComponent,
            resolve: {
              demandas: DemandasResolver
            },
            data: {
              demandaEtapaStatus: DemandaEtapaStatus.Aprovada
            }
          },
          {
            path: 'enviadas-para-captacao',
            component: DemandasListComponent,
            resolve: {
              demandas: DemandasResolver
            },
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
