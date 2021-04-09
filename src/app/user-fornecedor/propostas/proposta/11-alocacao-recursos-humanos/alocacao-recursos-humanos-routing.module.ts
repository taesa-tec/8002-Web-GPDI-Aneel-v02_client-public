import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosHumanosComponent
} from '@app/user-fornecedor/propostas/proposta/11-alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {EmpresasResolver} from '@app/user-fornecedor/resolvers/empresas.resolver';
import {EtapasResolver} from '@app/user-fornecedor/resolvers/etapas.resolver';
import {RecursosHumanosResolver} from '@app/user-fornecedor/resolvers/recursos-humanos.resolver';


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
