import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SidebarComponent} from '@app/dashboard/side-bar/sidebar.component';
import {PropostasComponent} from '@app/user-fornecedor/propostas/propostas.component';
import {PropostasResolver} from '@app/user-fornecedor/resolvers/propostas.resolver';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: PropostasComponent,
        pathMatch: 'full',
        resolve: {
          propostas: PropostasResolver
        },
      }
    ]
  },
  {
    path: ':id', // Id da captação, não da proposta
    resolve: {
      proposta: PropostaResolver
    },
    loadChildren: () => import('./proposta/proposta.module').then(m => m.PropostaModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostasRoutingModule {
}
