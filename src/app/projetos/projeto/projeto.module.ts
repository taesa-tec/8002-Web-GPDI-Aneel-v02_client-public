import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { IniciadoModule } from './iniciado/iniciado.module';
import { CommonModule } from './common/common.module';
import { PropostaModule } from './proposta/proposta.module';
import { EncerradoModule } from './encerrado/encerrado.module';
import { CentralAdministrativaModule } from './central-administrativa/central-administrativa.module';
import { StatusFlowComponent } from './status-flow.component';
import { ProjetoRoutingModule } from './projeto-routing.module';

@NgModule({
    declarations: [StatusFlowComponent],
    imports: [
        SharedModule,
        CommonModule,
        CentralAdministrativaModule,
        PropostaModule,
        IniciadoModule,
        EncerradoModule,
        ProjetoRoutingModule
    ],
    exports: [
        CentralAdministrativaModule,
        CommonModule,
        PropostaModule,
        IniciadoModule,
        EncerradoModule
    ]
})
export class ProjetoModule { }
