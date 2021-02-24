import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EtapasComponent} from '@app/user-fornecedor/propostas/proposta/07-etapas/etapas.component';
import {EtapaResolver, EtapasResolver} from '@app/user-fornecedor/resolvers/etapas.resolver';


const routes: Routes = [
  {
    path: '',
    component: EtapasComponent,
    resolve: {
      etapas: EtapasResolver,
      etapa: EtapaResolver
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
export class EtapasRoutingModule {
}
