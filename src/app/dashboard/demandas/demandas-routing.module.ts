import { AuthGuard } from '../../auth/auth.guard';
import { EnviadasParaCaptacaoComponent } from './enviadas-para-captacao/enviadas-para-captacao.component';
import { ReprovadasComponent } from './reprovadas/reprovadas.component';
import { AprovadasComponent } from './aprovadas/aprovadas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestaoDeDemandasComponent } from './demandas.component';
import { ElaboracaoComponent } from './elaboracao/elaboracao.component';
import { DemandasListComponent } from './demandas-list/demandas-list.component';
import { DemandaEtapa, DemandaEtapaStatus } from './commons';

const routes: Routes = [
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
          demandaEtapaStatus: DemandaEtapaStatus.Concluido
        }
      },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandasRoutingModule { }
