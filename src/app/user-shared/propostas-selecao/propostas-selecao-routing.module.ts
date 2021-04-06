import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '@app/user-shared/propostas-selecao/home/home.component';
import {PendenteComponent} from '@app/user-shared/propostas-selecao/pendente/pendente.component';
import {FinalizadaComponent} from '@app/user-shared/propostas-selecao/finalizada/finalizada.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pendente'
      },
      {
        path: 'pendente',
        component: PendenteComponent,
        resolve: {}
      },
      {
        path: 'finalizada',
        component: FinalizadaComponent,
        resolve: {}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostasSelecaoRoutingModule {
}
