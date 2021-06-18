import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {AlocacaoRecursosMateriaisRoutingModule} from './alocacao-recursos-materiais-routing.module';
import {AlocacaoRecursosMateriaisComponent} from './alocacao-recursos-materiais.component';
import {AlocarRecursoMaterialFormComponent} from './alocar-recurso-material-form/alocar-recurso-material-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/propostas/proposta/resolvers';
import {EtapasService, RecursosMateriaisService} from '@app/propostas/proposta/services/proposta-service-base.service';
import {EmpresasResolver} from '@app/propostas/proposta/resolvers';
import {EtapasResolver} from '@app/propostas/proposta/resolvers';
import {RecursosMateriaisResolver} from '@app/propostas/proposta/resolvers';
import {PropostaServiceBase} from '@app/propostas/proposta/services/proposta-service-base.service';


@NgModule({
  declarations: [
    AlocacaoRecursosMateriaisComponent,
    AlocarRecursoMaterialFormComponent
  ],
  imports: [
    SharedModule,
    AlocacaoRecursosMateriaisRoutingModule
  ], providers: [
    CrudItemResolver,
    CrudDataResolver,
    PropostaServiceBase.fromAppend('RecursosMateriais/Alocacao'),
    EmpresasResolver,
    EtapasResolver,
    EtapasService,
    RecursosMateriaisService,
    RecursosMateriaisResolver
  ]
})
export class AlocacaoRecursosMateriaisModule {
}
