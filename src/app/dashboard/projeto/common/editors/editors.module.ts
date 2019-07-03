import {NgModule} from '@angular/core';
import {ResultadoCapacitacaoComponent} from './resultado-capacitacao/resultado-capacitacao.component';
import {SharedModule} from '@app/core/shared/shared.module';
import {ResultadoCientificoComponent} from './resultado-cientifico/resultado-cientifico.component';
import {ResultadoInfraEstruturaComponent} from './resultado-infra-estrutura/resultado-infra-estrutura.component';
import {ResultadoPropriedadeIntelectualComponent} from './resultado-propriedade-intelectual/resultado-propriedade-intelectual.component';
import {ResultadoSocioambientalComponent} from './resultado-socioambiental/resultado-socioambiental.component';
import {ResultadoEconomicoComponent} from './resultado-economico/resultado-economico.component';
import {LoggerModule} from '@app/logger/logger.module';

@NgModule({
    declarations: [
        ResultadoCapacitacaoComponent,
        ResultadoCientificoComponent,
        ResultadoInfraEstruturaComponent,
        ResultadoPropriedadeIntelectualComponent,
        ResultadoSocioambientalComponent,
        ResultadoEconomicoComponent
    ],
    entryComponents: [
        ResultadoCapacitacaoComponent,
        ResultadoCientificoComponent,
        ResultadoInfraEstruturaComponent,
        ResultadoPropriedadeIntelectualComponent,
        ResultadoSocioambientalComponent,
        ResultadoEconomicoComponent
    ],
    imports: [
        SharedModule,
        LoggerModule
    ]
})
export class EditorsModule {
}
