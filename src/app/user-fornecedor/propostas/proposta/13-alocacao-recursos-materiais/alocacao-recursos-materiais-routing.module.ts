import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosMateriaisComponent
} from '@app/user-fornecedor/propostas/proposta/13-alocacao-recursos-materiais/alocacao-recursos-materiais.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';

const routes: Routes = [{
  path: '',
  component: AlocacaoRecursosMateriaisComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlocacaoRecursosMateriaisRoutingModule {
}
