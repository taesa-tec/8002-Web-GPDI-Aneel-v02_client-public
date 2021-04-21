import {Provider} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {CAPTACAO_ID, PROPOSTA} from './tokens';
import {Proposta, SIDEBAR_MENU} from '@app/commons';
import {PropostasService} from '@app/proposta/services/propostas.service';

export const CaptacaoIdProvider: Provider = {
  provide: CAPTACAO_ID,
  deps: [ActivatedRoute],
  useFactory: (route: ActivatedRoute) => {
    const behavior = new BehaviorSubject(0);
    route.params.subscribe(p => {
      behavior.next(parseFloat(p.id || 0));
    });
    return behavior;
  }
};

export const PropostaProvider: Provider = {
  provide: PROPOSTA,
  deps: [PropostasService],
  useFactory: (service: PropostasService) => {
    const behavior = new BehaviorSubject(null);
    service.proposta.subscribe(proposta => {
      behavior.next(proposta);

    });

    return behavior;
  }
};

export const PropostaSidebar: Provider = {
  provide: SIDEBAR_MENU,
  deps: [PROPOSTA],
  useFactory: (propostaObservable: BehaviorSubject<Proposta>) => {
    const behavior = new BehaviorSubject([
      {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
      {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}
    ]);

    propostaObservable.subscribe(proposta => {
      let menu_itens = [
        {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
        {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}];

      if (proposta.dataClausulasAceitas !== null && (proposta.participacao === 1 || proposta.participacao === 3)) {
        menu_itens = [
          ...menu_itens,
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
        ];

      }
      behavior.next(menu_itens);
    });

    return behavior;
  },

};
