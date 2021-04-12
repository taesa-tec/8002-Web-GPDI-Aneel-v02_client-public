import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosMateriaisComponent
} from '@app/user-fornecedor/propostas/proposta/13-alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {EmpresasResolver} from '@app/user-fornecedor/resolvers/empresas.resolver';
import {EtapasResolver} from '@app/user-fornecedor/resolvers/etapas.resolver';
import {RecursosMateriaisResolver} from '@app/user-fornecedor/resolvers/recursos-materiais.resolver';

const routes: Routes = [{
  path: '',
  component: AlocacaoRecursosMateriaisComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver,
    empresas: EmpresasResolver,
    etapas: EtapasResolver,
    recursos: RecursosMateriaisResolver
  },
  runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlocacaoRecursosMateriaisRoutingModule {
}
