import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosMateriaisComponent
} from '@app/pages/propostas/proposta/pages/13-alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import {CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';
import {EmpresasResolver} from '@app/pages/propostas/proposta/resolvers';
import {EtapasResolver} from '@app/pages/propostas/proposta/resolvers';
import {RecursosMateriaisResolver} from '@app/pages/propostas/proposta/resolvers';

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
