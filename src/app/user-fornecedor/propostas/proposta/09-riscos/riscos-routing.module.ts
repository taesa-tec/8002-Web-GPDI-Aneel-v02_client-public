import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RiscosComponent} from '@app/user-fornecedor/propostas/proposta/09-riscos/riscos.component';
import {RiscoResolver, RiscosResolver} from '@app/user-fornecedor/resolvers/riscos.resolver';


const routes: Routes = [
  {
    path: '',
    component: RiscosComponent,
    resolve: {
      risco: RiscoResolver,
      riscos: RiscosResolver
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
