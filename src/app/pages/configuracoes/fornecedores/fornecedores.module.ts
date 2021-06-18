import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {ServiceBase} from '@app/services/service-base.service';
import {HttpClient} from '@angular/common/http';
import {FornecedoresComponent} from '@app/pages/configuracoes/fornecedores/fornecedores.component';
import {FornecedoresRoutingModule} from '@app/pages/configuracoes/fornecedores/fornecedores-routing.module';
import {ListResolver} from '@app/resolvers/list.resolver';
import {ItemResolver} from '@app/resolvers/item.resolver';
import {FornecedorFormComponent} from '@app/pages/configuracoes/fornecedores/fornecedor-form/fornecedor-form.component';


@NgModule({
  declarations: [
    FornecedoresComponent,
    FornecedorFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FornecedoresRoutingModule
  ],
  providers: [
    {provide: ServiceBase, deps: [HttpClient], useFactory: (httpClient) => new ServiceBase(httpClient, 'Sistema/Fornecedores')},
    ListResolver,
    ItemResolver,
  ]
})
export class FornecedoresModule {
}
