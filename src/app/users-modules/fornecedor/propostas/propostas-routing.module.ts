import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SidebarComponent} from '@app/dashboard/sidebar/sidebar.component';
import {PropostasListComponent} from '@app/users-modules/fornecedor/propostas/propostas-list.component';
import {PropostasResolver} from '@app/users-modules/fornecedor/resolvers/propostas.resolver';
import {PropostasComponent} from '@app/users-modules/fornecedor/propostas/propostas.component';


const routes: Routes = [
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
