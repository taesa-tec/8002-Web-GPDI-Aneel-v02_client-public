import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorComponent } from './fornecedor.component';
import { RiscosModule } from './riscos/riscos.module';
import { RecursosHumanosModule } from './recursos-humanos/recursos-humanos.module';
import { DetalhesDemandaModule } from './detalhes-demanda/detalhes-demanda.module';
import { RecursosMateriaisModule } from './recursos-materiais/recursos-materiais.module';
import { AlocacaoRecursosMateriaisModule } from './alocacao-recursos-materiais/alocacao-recursos-materiais.module';
import { AlocacaoRecursosHumanosModule } from './alocacao-recursos-humanos/alocacao-recursos-humanos.module';
import { EtapasModule } from './etapas/etapas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EscopoModule } from './escopo/escopo.module';
import { PlanoTrabalhoModule } from './plano-trabalho/plano-trabalho.module';
import { CoExecutoresModule } from './co-executores/co-executores.module';
import { ValidacaoContratoBaseModule } from './validacao-contrato-base/validacao-contrato-base.module';
import { PropostaAprovacaoModule } from './proposta-aprovacao/proposta-aprovacao.module';
import { ValidacaoContratosModule } from './validacao-contratos/validacao-contratos.module';

@NgModule({
  declarations: [
    FornecedorComponent
  ],
  imports: [
    SharedModule,
    FornecedorRoutingModule,
    DetalhesDemandaModule,
    ValidacaoContratoBaseModule,
    CoExecutoresModule,
    ValidacaoContratosModule,
    PlanoTrabalhoModule,
    EscopoModule,
    ProdutosModule,
    EtapasModule,
    RiscosModule,
    RecursosHumanosModule,
    AlocacaoRecursosHumanosModule,
    RecursosMateriaisModule,
    AlocacaoRecursosMateriaisModule,
    PropostaAprovacaoModule
  ]
})
export class FornecedorModule { }
