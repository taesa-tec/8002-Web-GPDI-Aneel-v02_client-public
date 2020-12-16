import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FornecedoresComponent} from '@app/dashboard/configuracoes/fornecedores/fornecedores.component';
import {ListResolver} from '@app/resolvers/list.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      fornecedores: ListResolver,
    },
    component: FornecedoresComponent
  }
  // ...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule {
}
