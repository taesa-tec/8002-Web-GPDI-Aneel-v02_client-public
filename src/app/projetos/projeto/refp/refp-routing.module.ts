import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NovoComponent} from './novo/novo.component';
import {RecursoHumanoComponent} from './novo/recurso-humano.component';
import {RecursoMaterialComponent} from './novo/recurso-material.component';
import {NovoRegistroResolver} from '@app/projetos/projeto/resolvers/novo-registro.resolver';
import {ListaComponent} from '@app/projetos/projeto/refp/lista/lista.component';
import {RegistroObservacoesResolver, RegistroResolver, RegistrosResolver} from '@app/projetos/projeto/resolvers/registros.resolver';

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
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Registros Pendentes - REFP'
    },
    resolve: {
      registros: 'registrosPendentes', registro: 'registroInfo', observacoes: RegistroObservacoesResolver
    }
  },
  {
    path: 'reprovado',
    runGuardsAndResolvers: 'always',
    component: ListaComponent,
    data: {
      title: 'Registros Reprovados - REFP'
    },
    resolve: {
      registros: 'registrosReprovados', registro: RegistroResolver, observacoes: RegistroObservacoesResolver,
      items: NovoRegistroResolver
    }
  },
  {
    path: 'aprovado',
    runGuardsAndResolvers: 'always',
    component: ListaComponent,
    data: {
      title: 'Registros Aprovados - REFP'
    },
    resolve: {
      registros: 'registrosAprovados',
      registro: 'registroInfo',
      observacoes: RegistroObservacoesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefpRoutingModule {
}
