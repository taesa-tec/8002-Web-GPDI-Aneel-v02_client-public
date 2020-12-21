import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-proposta-aprovacao',
  templateUrl: './proposta-aprovacao.component.html',
  styleUrls: ['./proposta-aprovacao.component.scss']
})
export class PropostaAprovacaoComponent implements OnInit {

  pdfUrl = null;
  propostaAprovacao: any;

  constructor() { }

  ngOnInit(): void {
    this.propostaAprovacao = this.getPropostaAprovacao();

    const clearCache = Date.now();
    this.pdfUrl = `${environment.api_url}/Demandas/${this.propostaAprovacao.especificacao.id}/Form/${this.propostaAprovacao.especificacao.pdf}/Pdf?time=${clearCache}`;
  }

  getPropostaAprovacao() {
    return {
      especificacao: {
        id: 2,
        pdf: 'especificacao-tecnica'
      },
      arquivos: ['Relatório.pdf', 'Relatório 2.pdf'],
      status: false
    };
  }

}
