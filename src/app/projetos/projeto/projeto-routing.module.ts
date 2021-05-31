import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjetoComponent} from '@app/projetos/projeto/projeto.component';
import {ProjetoResolver} from '@app/projetos/projeto/resolvers/projeto.resolver';

const routes: Routes = [
  {
    matcher: (segments => {
      if (segments.length > 0) {
        const id = parseFloat(segments[0].path);
        if (!isNaN(id)) {
          return {
            consumed: [segments[0]], posParams: {id: segments[0]}
          };
        }
      }
      return null;
    }),
    component: ProjetoComponent,
    resolve: {
      projeto: ProjetoResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'refp'
      },
      {
        path: 'refp',
        loadChildren: () => import('./refp/refp.module').then(m => m.RefpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule {
}
