import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecursosHumanosComponent} from '@app/pages/propostas/proposta/pages/10-recursos-humanos/recursos-humanos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';
import {EmpresasResolver} from '@app/pages/propostas/proposta/resolvers';


const routes: Routes = [{
  path: '',
  component: RecursosHumanosComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver,
    empresas: EmpresasResolver,
  },
  runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule {
}
