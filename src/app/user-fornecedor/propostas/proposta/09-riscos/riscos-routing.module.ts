import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RiscosComponent} from '@app/user-fornecedor/propostas/proposta/09-riscos/riscos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';


const routes: Routes = [
  {
    path: '',
    component: RiscosComponent,
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
export class RiscosRoutingModule {
}
