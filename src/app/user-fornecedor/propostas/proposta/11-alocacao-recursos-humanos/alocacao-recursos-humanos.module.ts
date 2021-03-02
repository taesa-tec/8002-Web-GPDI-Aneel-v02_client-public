import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {AlocacaoRecursosHumanosRoutingModule} from './alocacao-recursos-humanos-routing.module';
import {AlocacaoRecursosHumanosComponent} from './alocacao-recursos-humanos.component';
import {AlocarRecursoHumanoFormComponent} from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {EtapasService, PropostaServiceBase, RecursosHumanosService} from '@app/user-fornecedor/services/propostas.service';
import {EmpresasResolver} from '@app/user-fornecedor/resolvers/empresas.resolver';
import {EtapasResolver} from '@app/user-fornecedor/resolvers/etapas.resolver';
import {RecursosHumanosResolver} from '@app/user-fornecedor/resolvers/recursos-humanos.resolver';


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
