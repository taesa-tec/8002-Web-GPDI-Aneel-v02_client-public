import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {PropostasListComponent} from '@app/user-fornecedor/propostas/propostas-list.component';
import {PropostasResolver} from '@app/user-fornecedor/resolvers/propostas.resolver';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasComponent} from '@app/user-fornecedor/propostas/propostas.component';


const routes: Routes = [
  {
    matcher: (segments => {
      if (segments.length > 0) {
        const id = parseFloat(segments[0].path); // Id da captação, não da proposta
        if (!isNaN(id)) {
          return {
            consumed: [segments[0]], posParams: {id: segments[0]}
          };
        }
      }
      return null;
    }),
    resolve: {
      proposta: PropostaResolver
    },
    loadChildren: () => import('./proposta/proposta.module').then(m => m.PropostaModule)
  },
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: PropostasComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'em-aberto'
          },
          {
            path: 'em-aberto',
            component: PropostasListComponent,
            resolve: {
              propostas: PropostasResolver
            },
          },
          {
            path: 'encerradas',
            component: PropostasListComponent,
            resolve: {
              propostas: PropostasResolver
            },
          }
        ],

      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostasRoutingModule {
}
