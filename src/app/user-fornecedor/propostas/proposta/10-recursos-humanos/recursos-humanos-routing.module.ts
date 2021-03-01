import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecursosHumanosComponent} from '@app/user-fornecedor/propostas/proposta/10-recursos-humanos/recursos-humanos.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {EmpresasResolver} from '@app/resolvers/empresas.resolver';
import {CoExecutoresResolver} from '@app/user-fornecedor/resolvers/co-executores.resolver';


const routes: Routes = [{
  path: '',
  component: RecursosHumanosComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver,
    empresas: EmpresasResolver,
    coexecutores: CoExecutoresResolver
  },
  runGuardsAndResolvers: (from, to) => {
    console.log(to, from);
    return to.fragment !== 'novo';
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule {
}
