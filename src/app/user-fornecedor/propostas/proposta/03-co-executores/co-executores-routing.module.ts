import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoExecutoresComponent} from '@app/user-fornecedor/propostas/proposta/03-co-executores/co-executores.component';
import {CoExecutoresResolver} from '@app/user-fornecedor/resolvers/co-executores.resolver';


const routes: Routes = [
  {
    path: '',
    component: CoExecutoresComponent,
    resolve: {
      coExecutores: CoExecutoresResolver
    },
    runGuardsAndResolvers: (from, to) => !to.fragment
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoExecutoresRoutingModule {
}
