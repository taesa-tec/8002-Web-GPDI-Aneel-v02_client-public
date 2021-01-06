import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem, SIDEBAR_MENU} from '@app/commons';
import {CaptacaoDetalhes} from '@app/user-shared/captacao';
import {CaptacoesService} from '@app/user-suprimento/services/captacoes.service';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './captacao.component.html',
  providers: [
    {
      provide: SIDEBAR_MENU,
      useFactory: (route: ActivatedRoute) => {
        const {captacao} = route.snapshot.data as { captacao: CaptacaoDetalhes };
        const menuConfigurar = {text: 'Configuração Propostas', icon: 'ta-gear', path: 'configuracao'};
        // @todo mudar o path "configuracao"
        const menuAlterar = {text: 'Alterações Recebimento Propostas', icon: 'ta-gear', path: 'configuracao'};
        return [
          {text: 'Detalhes do Projeto', icon: 'ta-file-check', path: 'detalhes'},
          (captacao.status === 'Fornecedor' ? menuAlterar : menuConfigurar),
          {text: 'Gerencimento Propostas', icon: 'ta-extrato', path: 'propostas'},
        ];
      },
      deps: [ActivatedRoute]

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
