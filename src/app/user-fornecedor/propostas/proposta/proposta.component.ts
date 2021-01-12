import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem, SIDEBAR_MENU} from '@app/commons';
import {CaptacaoDetalhes} from '@app/user-shared/captacao';
import {DevelopmentComponent} from '@app/user-fornecedor/propostas/proposta/development/development.component';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './proposta.component.html',
  providers: [
    {
      provide: SIDEBAR_MENU,
      useFactory: (route: ActivatedRoute): MenuItem[] => {
        return [
          {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
          {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'},
          {path: 'co-executores', text: 'Cadastro Co-Executores', icon: 'ta-empresas'},
          {path: 'contrato', text: 'Validação Contrato', icon: 'ta-gavel'},
          {path: 'plano-de-trabalho', text: 'Plano de Trabalho', icon: 'ta-work-plan'},
          {path: 'escopo', text: 'Escopo', icon: 'ta-projeto'},
          {path: 'produtos', text: 'Produtos', icon: 'ta-box'},
          {path: 'etapas', text: 'Etapas', icon: 'ta-etapas'},
          {path: 'riscos', text: 'Tabela de Riscos', icon: 'ta-alert'},
          {path: 'recursos-humanos', text: 'Recursos Humanos', icon: 'ta-group'},
          {path: 'alocacao-recursos-humanos', text: 'Alocação de Recursos Humanos', icon: 'ta-alocacao-rh'},
          {path: 'recursos-materiais', text: 'Recursos Materiais', icon: 'ta-recurso-material'},
          {path: 'alocacao-recursos-materiais', text: 'Alocação de Recursos Materiais', icon: 'ta-alocacao-material'},
          {path: 'envio', text: 'Envio Proposta para aprovação', icon: 'ta-ok'},
        ];
      },
      deps: [ActivatedRoute]

    }
  ]
})
export class PropostaComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
    });
  }

}
