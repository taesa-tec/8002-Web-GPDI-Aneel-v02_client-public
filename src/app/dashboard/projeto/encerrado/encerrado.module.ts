import {NgModule} from '@angular/core';

import {SharedModule} from '@app/core/shared/shared.module';
import {EncerradoRoutingModule} from './encerrado-routing.module';
import {RelatorioFinalAuditoriaComponent} from './relatorio-final-auditoria/relatorio-final-auditoria.component';
import {RelatorioEtapaProjetoComponent} from './relatorio-etapa-projeto/relatorio-etapa-projeto.component';
import {ResultadoCapacitacaoComponent} from './resultado-capacitacao/resultado-capacitacao.component';
import {ResultadoCientificoComponent} from './resultado-cientifico/resultado-cientifico.component';
import {ResultadoInfraEstruturaComponent} from './resultado-infra-estrutura/resultado-infra-estrutura.component';
import {ResultadoPropriedadeIntelectualComponent} from './resultado-propriedade-intelectual/resultado-propriedade-intelectual.component';
import {ResultadoSocioambientalComponent} from './resultado-socioambiental/resultado-socioambiental.component';
import {ResultadoEconomicoComponent} from './resultado-economico/resultado-economico.component';
import {RelatorioAtividadesComponent} from './relatorio-atividades/relatorio-atividades.component';
import {CommonModule} from '../common/common.module';

@NgModule({
    declarations: [
        RelatorioFinalAuditoriaComponent,
        RelatorioEtapaProjetoComponent,
        ResultadoCapacitacaoComponent,
        ResultadoCientificoComponent,
        ResultadoInfraEstruturaComponent,
        ResultadoPropriedadeIntelectualComponent,
        ResultadoSocioambientalComponent,
        ResultadoEconomicoComponent,
        RelatorioAtividadesComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        EncerradoRoutingModule
    ]
})
export class EncerradoModule {
}
