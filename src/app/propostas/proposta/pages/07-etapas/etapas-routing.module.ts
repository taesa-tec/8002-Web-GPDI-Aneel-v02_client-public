import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EtapasComponent} from '@app/propostas/proposta/pages/07-etapas/etapas.component';
import {EtapaResolver, EtapasResolver} from '@app/propostas/proposta/resolvers';


const routes: Routes = [
  {
    path: '',
    component: EtapasComponent,
    resolve: {
      etapas: EtapasResolver,
      etapa: EtapaResolver
    },
    runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapasRoutingModule {
}
