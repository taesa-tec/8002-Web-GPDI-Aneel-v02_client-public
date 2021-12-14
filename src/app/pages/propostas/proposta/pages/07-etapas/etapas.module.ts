import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {EtapasRoutingModule} from './etapas-routing.module';
import {EtapasComponent} from './etapas.component';
import {EtapaFormComponent} from './etapa-form/etapa-form.component';
import {EtapaResolver, EtapasResolver} from '@app/pages/propostas/proposta/resolvers';
import {EtapasService, ProdutosService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {ProdutosResolver} from '@app/pages/propostas/proposta/resolvers';
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
