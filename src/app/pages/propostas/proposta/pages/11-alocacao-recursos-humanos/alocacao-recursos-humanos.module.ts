import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {AlocacaoRecursosHumanosRoutingModule} from './alocacao-recursos-humanos-routing.module';
import {AlocacaoRecursosHumanosComponent} from './alocacao-recursos-humanos.component';
import {AlocarRecursoHumanoFormComponent} from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';
import {EtapasService, RecursosHumanosService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {EmpresasResolver} from '@app/pages/propostas/proposta/resolvers';
import {EtapasResolver} from '@app/pages/propostas/proposta/resolvers';
import {RecursosHumanosResolver} from '@app/pages/propostas/proposta/resolvers';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';


@NgModule({
  declarations: [
    AlocacaoRecursosHumanosComponent,
    AlocarRecursoHumanoFormComponent,
  ],
  imports: [
    SharedModule,
    AlocacaoRecursosHumanosRoutingModule
  ],
  providers: [
    RecursosHumanosService,
    RecursosHumanosResolver,
    EtapasService,
    CrudItemResolver,
    CrudDataResolver,
    EmpresasResolver,
    EtapasResolver,
    PropostaServiceBase.fromAppend('RecursosHumanos/Alocacao')
  ]
})
export class AlocacaoRecursosHumanosModule {
}
