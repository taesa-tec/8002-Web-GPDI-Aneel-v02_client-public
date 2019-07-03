import {NgModule} from '@angular/core';

import {SharedModule} from '@app/core/shared/shared.module';

import {RefpInserirComponent} from '@app/dashboard/projeto/iniciado/refp-inserir/refp-inserir.component';
import {RefpListComponent} from '@app/dashboard/projeto/iniciado/refp-list/refp-list.component';
import {RefpExtratoComponent} from '@app/dashboard/projeto/iniciado/refp-extrato/refp-extrato.component';
import {AlterarProjetoComponent} from '@app/dashboard/projeto/iniciado/alterar-projeto/alterar-projeto.component';
import {ConsultarDadosComponent} from '@app/dashboard/projeto/iniciado/consultar-dados/consultar-dados.component';
import {RecursoHumanoComponent} from '@app/dashboard/projeto/iniciado/refp-inserir/recurso-humano.component';
import {RecursoMaterialComponent} from '@app/dashboard/projeto/iniciado/refp-inserir/recurso-material.component';
import {RegistroRefpDetailsComponent} from '@app/dashboard/projeto/iniciado/registro-refp-details/registro-refp-details.component';
import {RegistroRecursoHumanoComponent} from '@app/dashboard/projeto/iniciado/registro-refp-details/registro-recurso-humano/registro-recurso-humano.component';
import {RegistroRecursoMaterialComponent} from '@app/dashboard/projeto/iniciado/registro-refp-details/registro-recurso-material/registro-recurso-material.component';
import {ProrrogarComponent} from '@app/dashboard/projeto/iniciado/prorrogar/prorrogar.component';
import {PropostaBaseComponent} from '@app/dashboard/projeto/iniciado/proposta-base/proposta-base.component';
import {ExtratoFinanceiroEmpresasComponent} from '@app/dashboard/projeto/iniciado/extrato-financeiro-empresas/extrato-financeiro-empresas.component';
import {IniciadoRoutingModule} from './iniciado-routing.module';
import {CommonModule} from '../common/common.module';

@NgModule({
    declarations: [
        RefpInserirComponent,
        RefpListComponent,
        RefpExtratoComponent,
        AlterarProjetoComponent,
        ConsultarDadosComponent,
        RecursoHumanoComponent,
        RecursoMaterialComponent,
        RegistroRefpDetailsComponent,
        RegistroRecursoHumanoComponent,
        RegistroRecursoMaterialComponent,
        ProrrogarComponent,
        PropostaBaseComponent,
        ExtratoFinanceiroEmpresasComponent
    ],
    entryComponents: [RegistroRefpDetailsComponent],
    imports: [
        SharedModule,
        CommonModule,
        IniciadoRoutingModule
    ]
})
export class IniciadoModule {
}
