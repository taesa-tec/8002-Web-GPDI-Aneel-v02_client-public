import {Component, InjectionToken, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Proposta, SIDEBAR_MENU} from '@app/commons';
import {map} from 'rxjs/operators';
import {CAPTACAO_ID} from '@app/user-fornecedor/propostas/proposta/shared';
import {ProdutosService} from '@app/user-fornecedor/services/produtos.service';
import {HttpClient} from '@angular/common/http';
import {ProdutosResolver} from '@app/user-fornecedor/resolvers/produtos.resolver';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './proposta.component.html',
  viewProviders: [],
  providers: [

    {
      provide: SIDEBAR_MENU,
      useFactory: (route: ActivatedRoute) => {
        return route.data.pipe(map(data => {
          let menu_itens = [
            {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
            {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}];
          if (data.proposta.dataClausulasAceitas !== null) {
            menu_itens = menu_itens.concat([
              {path: 'co-executores', text: 'Cadastro Co-Executores', icon: 'ta-empresas'},
              {path: 'contrato', text: 'Validação Contrato', icon: 'ta-gavel'},
              {path: 'plano-de-trabalho', text: 'Plano de Trabalho', icon: 'ta-work-plan'},
              {path: 'produtos', text: 'Produtos', icon: 'ta-box'},
              {path: 'etapas', text: 'Etapas', icon: 'ta-etapas'},
              {path: 'escopo', text: 'Escopo', icon: 'ta-projeto'},
              {path: 'riscos', text: 'Tabela de Riscos', icon: 'ta-alert'},
              {path: 'recursos-humanos', text: 'Recursos Humanos', icon: 'ta-group'},
              {path: 'alocacao-recursos-humanos', text: 'Alocação de Recursos Humanos', icon: 'ta-alocacao-rh'},
              {path: 'recursos-materiais', text: 'Recursos Materiais', icon: 'ta-recurso-material'},
              {path: 'alocacao-recursos-materiais', text: 'Alocação de Recursos Materiais', icon: 'ta-alocacao-material'},
              {path: 'envio', text: 'Envio Proposta para aprovação', icon: 'ta-ok'},
            ]);
          }
          return menu_itens;
        }));

      },
      deps: [ActivatedRoute]

    },
    {
      provide: CAPTACAO_ID,
      deps: [ActivatedRoute],
      useFactory: (route: ActivatedRoute) => parseFloat(route.snapshot.params.id)
    }
  ],

})
export class PropostaComponent implements OnInit {
  proposta: Proposta;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.proposta = data.proposta;
    });
  }

}
