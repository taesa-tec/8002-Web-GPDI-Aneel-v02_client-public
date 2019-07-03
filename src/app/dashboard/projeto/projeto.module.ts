import {NgModule} from '@angular/core';

import {SharedModule} from '@app/core/shared/shared.module';
import {IniciadoModule} from './iniciado/iniciado.module';
import {CommonModule} from './common/common.module';
import {PropostaModule} from './proposta/proposta.module';
import {EncerradoModule} from './encerrado/encerrado.module';
import {CentralAdministrativaModule} from './central-administrativa/central-administrativa.module';
import {ProjetoRoutingModule} from './projeto-routing.module';
import {ProjetoComponent} from '@app/dashboard/projeto/projeto.component';
import {LogProjetoComponent} from '@app/dashboard/projeto/log-projeto/log-projeto.component';
import {LogComponent} from '@app/dashboard/projeto/log-projeto/log.component';


@NgModule({
    declarations: [ProjetoComponent, LogProjetoComponent, LogComponent],
    imports: [
        SharedModule,
        //CentralAdministrativaModule,
        //PropostaModule,
        //IniciadoModule,
        //EncerradoModule,
        ProjetoRoutingModule,
    ],
    exports: [
        //CentralAdministrativaModule,
        //PropostaModule,
        //IniciadoModule,
        //EncerradoModule
    ],

})
export class ProjetoModule {
}
