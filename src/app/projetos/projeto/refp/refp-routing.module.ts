import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NovoComponent} from './novo/novo.component';
import {RecursoHumanoComponent} from './novo/recurso-humano.component';
import {RecursoMaterialComponent} from './novo/recurso-material.component';
import {NovoRegistroResolver} from '@app/projetos/projeto/resolvers/novo-registro.resolver';
import {ListaComponent} from '@app/projetos/projeto/refp/lista/lista.component';
import {RegistrosResolver} from '@app/projetos/projeto/resolvers/registros.resolver';

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
  },
  {
    path: 'pendente',
    component: ListaComponent,
    resolve: {
      //registros: RegistrosResolver
    }
  },
  {
    path: 'reprovado',
    component: ListaComponent,
    resolve: {
      //registros: RegistrosResolver
    }
  },
  {
    path: 'aprovado',
    component: ListaComponent,
    resolve: {
      //registros: RegistrosResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefpRoutingModule {
}
