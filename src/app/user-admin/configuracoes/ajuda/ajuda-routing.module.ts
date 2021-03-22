import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AjudaComponent} from '@app/user-admin/configuracoes/ajuda/ajuda.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-admin/resolvers/crud.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AjudaComponent,
    resolve: {
      item: CrudItemResolver,
      data: CrudDataResolver
    },
    runGuardsAndResolvers: (from, to) => {
      return to.fragment !== 'novo';
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjudaRoutingModule {
}
