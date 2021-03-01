import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  AlocacaoRecursosHumanosComponent
} from '@app/user-fornecedor/propostas/proposta/11-alocacao-recursos-humanos/alocacao-recursos-humanos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';


const routes: Routes = [{
  path: '',
  component: AlocacaoRecursosHumanosComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlocacaoRecursosHumanosRoutingModule {
}
