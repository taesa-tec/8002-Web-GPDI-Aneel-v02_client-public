import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suprimentos',
  templateUrl: './suprimentos.component.html',
  styleUrls: ['./suprimentos.component.scss']
})
export class SuprimentosComponent implements OnInit {

  projeto = {
    numero: 'ID001',
    titulo: 'TÍTULO RESUMIDO PROJETO ENTRA AQUI',
    catalogStatus: {
      status: 'Captação de Propostas'
    }
  };

  menu = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    switch(id) {
      case '1':
        this.menu = [
          {text: 'Detalhes do Projeto', icon: 'ta-file-check', path: 'proposta/detalhes-projeto'},
          {text: 'Configuração Propostas', icon: 'ta-gear', path: 'proposta/configuracao-proposta'},
          {text: 'Gerenciamento Propostas', icon: 'ta-extrato', path: 'proposta/gerenciamento-propostas'},
        ];
        break;
      case '2':
        this.menu = [
          {text: 'Detalhes do Projeto', icon: 'ta-file-check', path: 'iniciado/detalhes-projeto'},
          {text: 'Alterações Recebimento Propostas', icon: 'ta-gear', path: 'iniciado/alteracao-proposta'},
          {text: 'Gerenciamento Propostas', icon: 'ta-extrato', path: 'iniciado/gerenciamento-propostas'},
        ];
        break;
      case '3':
        this.menu = [
          {text: 'Detalhes do Projeto', icon: 'ta-file-check', path: 'encerrado/detalhes-projeto'},
          {text: 'Detalhamento Processo Captação', icon: 'ta-gear', path: 'encerrado/detalhe-proposta'},
          {text: 'Gerenciamento Propostas', icon: 'ta-extrato', path: 'encerrado/gerenciamento-propostas'},
        ];
    }

  }

}
