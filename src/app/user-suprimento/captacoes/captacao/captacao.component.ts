import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem, SIDEBAR_MENU} from '@app/commons';
import {CaptacaoDetalhes} from '@app/user-shared/captacao';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './captacao.component.html',
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Detalhes do Projeto', icon: 'ta-file-check', path: 'detalhes'},
        {text: 'Configuração Propostas', icon: 'ta-gear', path: 'configuracao'},
        {text: 'Gerencimento Propostas', icon: 'ta-extrato', path: 'propostas'},
      ]
    }
  ]
})
export class CaptacaoComponent implements OnInit {

  captacao: CaptacaoDetalhes;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.captacao = data.captacao;
    });
  }

}
