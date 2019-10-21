import { CentralAdministrativaModule } from './../../projeto/central-administrativa/central-administrativa.module';
import { DemandaComponent } from './demanda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandaRoutingModule } from './demanda-routing.module';
import { DefinicaoPessoasProcessoValidacaoComponent } from './definicao-pessoas-processo-validacao/definicao-pessoas-processo-validacao.component';
import { SharedModule } from '@app/core/shared/shared.module';
import { EspecificacaoTecnicaComponent } from './especificacao-tecnica/especificacao-tecnica.component';
import { TemasComponent } from './temas/temas.component';
import { DocumentoAprovacoesComponent } from './documento-aprovacoes/documento-aprovacoes.component';
import { ConfPadraoModule } from './../conf-padrao/conf-padrao.module';
import { CentralAdministrativaComponent } from './central-administrativa/central-administrativa.component';
import { PreAprovacaoComponent } from './pre-aprovacao/pre-aprovacao.component';

@NgModule({
  declarations: [
    DemandaComponent,
    DefinicaoPessoasProcessoValidacaoComponent,
    EspecificacaoTecnicaComponent,
    TemasComponent,
    DocumentoAprovacoesComponent,
    PreAprovacaoComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DemandaRoutingModule,
    ConfPadraoModule,
    CentralAdministrativaModule
  ]
})
export class DemandaModule { }
