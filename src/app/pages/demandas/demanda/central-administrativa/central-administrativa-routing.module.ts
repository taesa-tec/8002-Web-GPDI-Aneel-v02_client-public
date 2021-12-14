import { StatusDemandaComponent } from './status-demanda/status-demanda.component';
import { CentralAdministrativaComponent } from './central-administrativa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CentralAdministrativaComponent,
    children: [
      {
        path: '',
        redirectTo: 'alteracao-status-demanda',
        pathMatch: 'full'
      },
      {
        path: 'alteracao-status-demanda',
        component: StatusDemandaComponent,
        // data: { text: 'Alteração Status Demanda', access: ['gestor-admin'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralAdministrativaRoutingModule { }
