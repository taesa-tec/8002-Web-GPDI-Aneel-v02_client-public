import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {AlocacaoRecursosMateriaisRoutingModule} from './alocacao-recursos-materiais-routing.module';
import {AlocacaoRecursosMateriaisComponent} from './alocacao-recursos-materiais.component';
import {AlocarRecursoMaterialFormComponent} from './alocar-recurso-material-form/alocar-recurso-material-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {EtapasService, PropostaServiceBase, RecursosMateriaisService} from '@app/user-fornecedor/services/propostas.service';
import {EmpresasResolver} from '@app/user-fornecedor/resolvers/empresas.resolver';
import {EtapasResolver} from '@app/user-fornecedor/resolvers/etapas.resolver';
import {RecursosMateriaisResolver} from '@app/user-fornecedor/resolvers/recursos-materiais.resolver';


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
