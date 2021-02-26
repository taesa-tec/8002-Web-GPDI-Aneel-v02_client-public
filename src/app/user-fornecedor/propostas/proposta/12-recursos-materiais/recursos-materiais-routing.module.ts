import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecursosMateriaisComponent} from '@app/user-fornecedor/propostas/proposta/12-recursos-materiais/recursos-materiais.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';


const routes: Routes = [{
  path: '',
  component: RecursosMateriaisComponent,
  resolve: {
    item: CrudItemResolver,
    data: CrudDataResolver
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosMateriaisRoutingModule {
}
