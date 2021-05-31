import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NovoComponent} from './novo/novo.component';
import {RecursoHumanoComponent} from './novo/recurso-humano.component';
import {RecursoMaterialComponent} from './novo/recurso-material.component';

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
        component: RecursoHumanoComponent
      },
      {
        path: 'recurso-material',
        component: RecursoMaterialComponent
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
