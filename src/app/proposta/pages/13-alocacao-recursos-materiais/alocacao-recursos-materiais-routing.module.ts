import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosMateriaisComponent
} from '@app/proposta/pages/13-alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import {CrudDataResolver, CrudItemResolver} from '@app/proposta/resolvers';
import {EmpresasResolver} from '@app/proposta/resolvers';
import {EtapasResolver} from '@app/proposta/resolvers';
import {RecursosMateriaisResolver} from '@app/proposta/resolvers';

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
