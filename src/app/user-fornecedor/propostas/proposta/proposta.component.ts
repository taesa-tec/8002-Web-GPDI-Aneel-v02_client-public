import {Component, InjectionToken, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Proposta, SIDEBAR_MENU} from '@app/commons';
import {map} from 'rxjs/operators';
import {CAPTACAO_ID} from '@app/user-fornecedor/propostas/proposta/shared';
import {EtapasService} from '@app/user-fornecedor/services/propostas.service';
import {extractRouteParams} from '@app/core';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './proposta.component.html',
  viewProviders: [],
  providers: [

    {
      provide: SIDEBAR_MENU,
      useFactory: (route: ActivatedRoute) => {
        const behavior = new BehaviorSubject([
          {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
          {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}
        ]);

        route.data.pipe(map(data => {
          let menu_itens = [
            {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
            {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}];

          menu_itens = [...menu_itens]; // só pra ide parar de encher o saco
          //*
          if (data.proposta.dataClausulasAceitas !== null && (data.proposta.participacao === 1 || data.proposta.participacao === 3)) {
            menu_itens = menu_itens.concat([
              {path: 'entidades', text: 'Cadastro Outras Entidades', icon: 'ta-empresas'},
              {path: 'plano-de-trabalho', text: 'Plano de Trabalho', icon: 'ta-work-plan'},
              {path: 'produtos', text: 'Produtos', icon: 'ta-box'},
              {path: 'etapas', text: 'Etapas', icon: 'ta-etapas'},
              {path: 'escopo', text: 'Escopo', icon: 'ta-projeto'},
              {path: 'riscos', text: 'Tabela de Riscos', icon: 'ta-alert'},
              {path: 'recursos-humanos', text: 'Recursos Humanos', icon: 'ta-group'},
              {path: 'alocacao-recursos-humanos', text: 'Alocação de Recursos Humanos', icon: 'ta-alocacao-rh'},
              {path: 'recursos-materiais', text: 'Recursos Materiais', icon: 'ta-recurso-material'},
              {path: 'alocacao-recursos-materiais', text: 'Alocação de Recursos Materiais', icon: 'ta-alocacao-material'},
              {path: 'contrato', text: 'Validação Contrato', icon: 'ta-gavel'},
              {path: 'envio', text: 'Envio Proposta para aprovação', icon: 'ta-ok'},
            ]);

          }
          //*/
          return menu_itens;
        }));
        return behavior;
      },
      deps: [ActivatedRoute]
    },
    {
      provide: CAPTACAO_ID,
      deps: [ActivatedRoute],
      useFactory: (route: ActivatedRoute) => {
        const params = extractRouteParams(route.snapshot);
        return parseFloat(params.id);
      }
    },
    EtapasService
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
