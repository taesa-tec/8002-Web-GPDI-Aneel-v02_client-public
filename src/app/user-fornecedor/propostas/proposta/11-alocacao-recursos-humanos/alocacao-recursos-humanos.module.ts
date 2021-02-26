import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {AlocacaoRecursosHumanosRoutingModule} from './alocacao-recursos-humanos-routing.module';
import {AlocacaoRecursosHumanosComponent} from './alocacao-recursos-humanos.component';
import {AlocarRecursoHumanoFormComponent} from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';


@NgModule({
  declarations: [
    AlocacaoRecursosHumanosComponent,
    AlocarRecursoHumanoFormComponent
  ],
  imports: [
    SharedModule,
    AlocacaoRecursosHumanosRoutingModule
  ],
  providers: [
    CrudItemResolver,
    CrudDataResolver,
    PropostaServiceBase.fromAppend('RecursosHumano/Alocacao')
  ]
})
export class AlocacaoRecursosHumanosModule {
}
