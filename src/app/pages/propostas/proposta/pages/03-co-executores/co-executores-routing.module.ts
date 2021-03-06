import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoExecutoresComponent} from '@app/pages/propostas/proposta/pages/03-co-executores/co-executores.component';
import {CoExecutoresResolver} from '@app/pages/propostas/proposta/resolvers';


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
