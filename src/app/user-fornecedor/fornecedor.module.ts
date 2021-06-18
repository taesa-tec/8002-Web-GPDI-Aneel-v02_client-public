import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FornecedorRoutingModule} from './fornecedor-routing.module';
import {DashboardModule} from '@app/dashboard';
import {HEADER_MENU, ROOT_URL, SIDEBAR_MENU} from '@app/commons';
import {PropostaResolver} from '@app/user-fornecedor/resolvers/proposta.resolver';
import {PropostasResolver} from '@app/user-fornecedor/resolvers/propostas.resolver';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {PROPOSTA_CAN_EDIT} from '@app/propostas/proposta/shared';
import {COMPONENT_LABELS} from '@app/core/shared';
import {Texts} from '@app/user-fornecedor/texts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    FornecedorRoutingModule
  ],
  providers: [
    PropostaResolver,
    PropostasResolver,
    PropostasService,
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/propostas`},
        {text: 'Projetos - Refinamento', icon: 'ta-file-check', path: `/refinamento`},
      ]
    }, {
      provide: HEADER_MENU,
      useValue: [
        {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/meu-cadastro`}
      ]
    }, {
      provide: ROOT_URL,
      useValue: ``
    },
    {
      provide: PROPOSTA_CAN_EDIT,
      useValue: true
    },
    {
      provide: COMPONENT_LABELS,
      useValue: Texts
    }
  ]
})
export class FornecedorModule {
}
