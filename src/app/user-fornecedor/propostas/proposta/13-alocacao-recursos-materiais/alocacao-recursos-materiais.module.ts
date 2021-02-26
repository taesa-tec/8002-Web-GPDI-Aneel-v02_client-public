import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {AlocacaoRecursosMateriaisRoutingModule} from './alocacao-recursos-materiais-routing.module';
import {AlocacaoRecursosMateriaisComponent} from './alocacao-recursos-materiais.component';
import {AlocarRecursoMaterialFormComponent} from './alocar-recurso-material-form/alocar-recurso-material-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/user-fornecedor/resolvers/crud.resolver';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';


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
    PropostaServiceBase.fromAppend('RecursosMateriais')
  ]
})
export class AlocacaoRecursosMateriaisModule {
}
