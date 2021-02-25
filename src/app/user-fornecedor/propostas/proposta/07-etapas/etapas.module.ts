import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {EtapasRoutingModule} from './etapas-routing.module';
import {EtapasComponent} from './etapas.component';
import {EtapaFormComponent} from './etapa-form/etapa-form.component';
import {EtapaResolver, EtapasResolver} from '@app/user-fornecedor/resolvers/etapas.resolver';
import {EtapasService, ProdutosService} from '@app/user-fornecedor/services/propostas.service';
import {ProdutosResolver} from '@app/user-fornecedor/resolvers/produtos.resolver';
import {MesesSelectorComponent} from './etapa-form/meses-selector.component';


@NgModule({
  declarations: [EtapasComponent, EtapaFormComponent, MesesSelectorComponent],
  imports: [
    SharedModule,
    EtapasRoutingModule
  ],

  providers: [
    EtapasService,
    EtapasResolver,
    EtapaResolver,
    ProdutosResolver,
    ProdutosService
  ]
})
export class EtapasModule {
}
