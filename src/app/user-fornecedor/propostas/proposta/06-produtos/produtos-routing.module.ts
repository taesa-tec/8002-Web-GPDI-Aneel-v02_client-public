import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProdutosComponent} from '@app/user-fornecedor/propostas/proposta/06-produtos/produtos.component';


const routes: Routes = [
  {path: '', component: ProdutosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule {
}
