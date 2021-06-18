import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsultarPlanejamentoRoutingModule} from './consultar-planejamento-routing.module';
import {ConsultarPlanejamentoComponent} from './consultar-planejamento.component';
import {MenuItem, TOPNAV_MENU} from '@app/commons';
import {DashboardModule} from '@app/dashboard';
import {ArquivoComponent} from './arquivo.component';
import {DocumentoResolver} from '@app/pages/projetos/projeto/consultar-planejamento/documento.resolver';

const menu: Array<MenuItem> = [
  {path: 'plano-trabalho', text: 'Plano de trabalho'},
  {path: 'contrato', text: 'Contrato'},
  {path: 'especificacao-tecnica', text: 'Especificacao Técnica'},
];

@NgModule({
  declarations: [ConsultarPlanejamentoComponent, ArquivoComponent],
  imports: [
    CommonModule,
    ConsultarPlanejamentoRoutingModule,
    DashboardModule
  ],
  providers: [
    {
      provide: TOPNAV_MENU,
      useValue: menu
    },
    DocumentoResolver.ToPath('PlanoTrabalho', 'planoTrabalho'),
    DocumentoResolver.ToPath('Contrato', 'contrato'),
    DocumentoResolver.ToPath('EspecificacaoTecnica', 'especificacaoTecnica')
  ]
})
export class ConsultarPlanejamentoModule {
}
