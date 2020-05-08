import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';


@NgModule({
  declarations: [
    ProdutosComponent, 
    ProdutoFormComponent
  ],
  imports: [
    SharedModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
