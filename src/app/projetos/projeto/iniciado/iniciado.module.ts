import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { RefpInserirComponent } from '@app/projetos/projeto/iniciado/refp-inserir/refp-inserir.component';
import { RefpListComponent } from '@app/projetos/projeto/iniciado/refp-list/refp-list.component';
import { RefpExtratoComponent } from '@app/projetos/projeto/iniciado/refp-extrato/refp-extrato.component';
import { AlterarProjetoComponent } from '@app/projetos/projeto/iniciado/alterar-projeto/alterar-projeto.component';
import { ConsultarDadosComponent } from '@app/projetos/projeto/iniciado/consultar-dados/consultar-dados.component';
import { RecursoHumanoComponent } from '@app/projetos/projeto/iniciado/refp-inserir/recurso-humano.component';
import { RecursoMaterialComponent } from '@app/projetos/projeto/iniciado/refp-inserir/recurso-material.component';
import { RegistroRefpDetailsComponent } from '@app/projetos/projeto/iniciado/registro-refp-details/registro-refp-details.component';
import { RegistroRecursoHumanoComponent } from '@app/projetos/projeto/iniciado/registro-refp-details/registro-recurso-humano/registro-recurso-humano.component';
import { RegistroRecursoMaterialComponent } from '@app/projetos/projeto/iniciado/registro-refp-details/registro-recurso-material/registro-recurso-material.component';
import { ProrrogarComponent } from '@app/projetos/projeto/iniciado/prorrogar/prorrogar.component';
import { PropostaBaseComponent } from '@app/projetos/projeto/iniciado/proposta-base/proposta-base.component';
import { ExtratoFinanceiroEmpresasComponent } from '@app/projetos/projeto/iniciado/extrato-financeiro-empresas/extrato-financeiro-empresas.component';

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
        SharedModule
    ]
})
export class IniciadoModule { }
