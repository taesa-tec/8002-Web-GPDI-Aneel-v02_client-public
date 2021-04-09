import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecursosHumanosComponent} from '@app/user-fornecedor/propostas/proposta/10-recursos-humanos/recursos-humanos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {CoExecutoresResolver} from '@app/user-fornecedor/resolvers/co-executores.resolver';
import {EmpresasResolver} from '@app/user-fornecedor/resolvers/empresas.resolver';


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
