import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NovoComponent} from './novo/novo.component';
import {RecursoHumanoComponent} from './novo/recurso-humano.component';
import {RecursoMaterialComponent} from './novo/recurso-material.component';
import {NovoRegistroResolver} from '@app/projetos/projeto/resolvers/novo-registro.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'novo'
  },
  {
    path: 'novo',
    component: NovoComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recurso-humano'
      },
      {
        path: 'recurso-humano',
        component: RecursoHumanoComponent,
        resolve: {
          items: NovoRegistroResolver
        }
      },
      {
        path: 'recurso-material',
        component: RecursoMaterialComponent,
        resolve: {
          items: NovoRegistroResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefpRoutingModule {
}
