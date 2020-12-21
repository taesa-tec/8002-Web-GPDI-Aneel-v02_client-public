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
import {ComponentsModule} from '@app/user-shared/components';


@NgModule({
  declarations: [CaptacaoComponent, DetalhesComponent, ConfiguracaoComponent, PropostasComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    DashboardModule,
    CaptacaoRoutingModule
  ],
  providers: [
    ContratoPadraoResolver,
    ContratosPadroesResolver,
    FornecedoresResolver
  ]
})
export class CaptacaoModule {
}
