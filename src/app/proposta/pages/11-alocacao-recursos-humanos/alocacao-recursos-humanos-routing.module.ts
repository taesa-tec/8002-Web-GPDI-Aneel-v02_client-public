import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosHumanosComponent
} from '@app/proposta/pages/11-alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/proposta/resolvers';
import {EmpresasResolver} from '@app/proposta/resolvers';
import {EtapasResolver} from '@app/proposta/resolvers';
import {RecursosHumanosResolver} from '@app/proposta/resolvers';


const routes: Routes = [{
  path: '',
  component: AlocacaoRecursosHumanosComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver,
    empresas: EmpresasResolver,
    etapas: EtapasResolver,
    recursos: RecursosHumanosResolver
  },
  runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlocacaoRecursosHumanosRoutingModule {
}
