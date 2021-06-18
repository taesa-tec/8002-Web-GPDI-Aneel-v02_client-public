import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RiscosComponent} from '@app/pages/propostas/proposta/pages/09-riscos/riscos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';


const routes: Routes = [
  {
    path: '',
    component: RiscosComponent,
    resolve: {
      item: CrudItemResolver,
      data: CrudDataResolver
    },
    runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiscosRoutingModule {
}
