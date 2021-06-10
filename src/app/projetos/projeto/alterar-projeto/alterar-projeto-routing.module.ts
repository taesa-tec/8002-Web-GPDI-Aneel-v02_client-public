import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopnavComponent} from '@app/dashboard/topnav/topnav.component';
import {ProrrogarComponent} from '@app/projetos/projeto/alterar-projeto/prorrogar/prorrogar.component';
import {RecursosHumanosComponent} from '@app/projetos/projeto/alterar-projeto/recursos-humanos/recursos-humanos.component';
import {RecursosMateriaisComponent} from '@app/projetos/projeto/alterar-projeto/recursos-materiais/recursos-materiais.component';

const routes: Routes = [
  {
    path: '',
    component: TopnavComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'prorrogar'
      }, {
        path: 'prorrogar',
        component: ProrrogarComponent,
        resolve: {
          produtos: 'projetoProdutos'
        }
      },
      {
        path: 'recursos-humanos',
        component: RecursosHumanosComponent
      },
      {
        path: 'recursos-materiais',
        component: RecursosMateriaisComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlterarProjetoRoutingModule {
}
