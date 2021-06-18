import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProdutosComponent} from '@app/propostas/proposta/pages/06-produtos/produtos.component';
import {ProdutoResolver, ProdutosResolver} from '@app/propostas/proposta/resolvers';
import {ProdutoTipoResolver} from '@app/resolvers/produto-tipo.resolver';
import {FaseCadeiaProdutoResolver} from '@app/resolvers/fase-cadeia-produto.resolver';


const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    resolve: {
      produtos: ProdutosResolver,
      tipos: ProdutoTipoResolver,
      fases: FaseCadeiaProdutoResolver,
      produto: ProdutoResolver
    },
    runGuardsAndResolvers: (from, to) => to.fragment !== 'novo'

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule {
}
