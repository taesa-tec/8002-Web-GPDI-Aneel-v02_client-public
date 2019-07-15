import {NgModule} from '@angular/core';

import {SharedModule} from '@app/core/shared/shared.module';
// Projeto Proposta
import {InfoComponent} from '@app/dashboard/projeto/proposta/info/info.component';
import {TemasComponent} from '@app/dashboard/projeto/proposta/temas/temas.component';
import {EtapasComponent} from '@app/dashboard/projeto/proposta/etapas/etapas.component';
import {EmpresasComponent} from '@app/dashboard/projeto/proposta/empresas/empresas.component';

import {PropostaRoutingModule} from './proposta-routing.module';
import {AtividadesComponent} from './atividades/atividades.component';
import {OrcamentoAtividadesComponent} from '../common/orcamento-atividades/orcamento-atividades.component';
import {CommonModule} from '../common/common.module';

@NgModule({
    declarations: [
        InfoComponent,
        TemasComponent,
        EtapasComponent,
        EmpresasComponent,
        AtividadesComponent,
        OrcamentoAtividadesComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        PropostaRoutingModule
    ]
})
export class PropostaModule {
}
