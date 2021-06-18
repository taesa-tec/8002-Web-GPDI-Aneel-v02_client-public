import {NgModule} from '@angular/core';

import {CaptacaoRoutingModule} from './captacao-routing.module';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {SharedModule} from '@app/dashboard/shared';
import {DashboardModule} from '@app/dashboard';
import {DetalhesComponent} from './detalhes/detalhes.component';
import {ConfiguracaoComponent} from './configuracao/configuracao.component';
import {PropostasComponent} from './propostas/propostas.component';
import {FornecedoresResolver} from '@app/resolvers/fornecedores.resolver';
import {ContratoPadraoResolver, ContratosPadroesResolver} from '@app/resolvers';
import {ComponentsModule} from '@app/components';
import {PropostasResolver} from '@app/user-suprimento/resolvers/propostas.resolver';
import {ListComponent} from './propostas/list.component';
import {PropostaDetalhesComponent} from './propostas/proposta-detalhes/proposta-detalhes.component';
import {PropostaDetalhesResolver} from '@app/user-suprimento/captacoes/captacao/proposta-detalhes.resolver';


@NgModule({
  declarations: [CaptacaoComponent, DetalhesComponent, ConfiguracaoComponent, PropostasComponent, ListComponent, PropostaDetalhesComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    DashboardModule,
    CaptacaoRoutingModule
  ],
  providers: [
    PropostaDetalhesResolver,
    ContratoPadraoResolver,
    PropostasResolver,
    ContratosPadroesResolver,
    FornecedoresResolver
  ]
})
export class CaptacaoModule {
}
