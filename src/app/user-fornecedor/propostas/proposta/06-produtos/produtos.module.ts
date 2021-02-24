import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ProdutosRoutingModule} from './produtos-routing.module';
import {ProdutosComponent} from './produtos.component';
import {ProdutoFormComponent} from './produto-form/produto-form.component';
import {ProdutosService} from '@app/user-fornecedor/services/produtos.service';
import {ProdutoResolver, ProdutosResolver} from '@app/user-fornecedor/resolvers/produtos.resolver';
import {ProdutoTipoResolver} from '@app/resolvers/produto-tipo.resolver';
import {FaseCadeiaProdutoResolver} from '@app/resolvers/fase-cadeia-produto.resolver';


@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutoFormComponent
  ],
  imports: [
    SharedModule,
    ProdutosRoutingModule
  ],
  providers: [
    ProdutosService,
    ProdutosResolver,
    ProdutoResolver,
    ProdutoTipoResolver,
    FaseCadeiaProdutoResolver
  ]
})
export class ProdutosModule {
}
