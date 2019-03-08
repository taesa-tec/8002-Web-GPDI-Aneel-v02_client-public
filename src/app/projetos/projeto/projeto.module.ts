import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { IniciadoModule } from './iniciado/iniciado.module';
import { CommonModule } from './common/common.module';
import { PropostaModule } from './proposta/proposta.module';
import { EncerradoModule } from './encerrado/encerrado.module';

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        CommonModule,
        PropostaModule,
        IniciadoModule,
        EncerradoModule
    ],
    exports: [
        CommonModule,
        PropostaModule,
        IniciadoModule,
        EncerradoModule
    ]
})
export class ProjetoModule { }
