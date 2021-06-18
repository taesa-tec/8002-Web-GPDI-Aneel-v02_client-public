import {NgModule} from '@angular/core';

import {SharedModule} from '@app/dashboard/shared/shared.module';
import {RecursosMateriaisRoutingModule} from './recursos-materiais-routing.module';
import {RecursosMateriaisComponent} from './recursos-materiais.component';
import {RecursoMaterialFormComponent} from './recurso-material-form/recurso-material-form.component';
import {CrudDataResolver, CrudItemResolver} from '@app/pages/propostas/proposta/resolvers';
import {CategoriasContabeisResolver} from '@app/resolvers/categorias-contabeis.resolver';
import {PropostaServiceBase} from '@app/pages/propostas/proposta/services/proposta-service-base.service';

@NgModule({
  declarations: [
    RecursosMateriaisComponent,
    RecursoMaterialFormComponent
  ],
  imports: [
    SharedModule,
    RecursosMateriaisRoutingModule
  ],
  providers: [
    CrudItemResolver,
    CrudDataResolver,
    PropostaServiceBase.fromAppend('RecursosMateriais')
  ]
})
export class RecursosMateriaisModule {
}
