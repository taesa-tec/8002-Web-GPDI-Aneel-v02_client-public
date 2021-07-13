import {Provider, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {CAPTACAO_ID, PROPOSTA, PROPOSTA_CAN_EDIT, PROPOSTA_LABELS} from './tokens';
import {MenuItem, Proposta, SIDEBAR_MENU} from '@app/commons';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {COMPONENT_LABELS} from '@app/core/shared';
import {PropostaTexts} from '@app/pages/propostas/proposta/shared/texts';
import {TABLE_ACTIONS} from '@app/core/components';
import {AuthService} from '@app/services';

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
  deps: [PROPOSTA, AuthService],
  useFactory: (propostaObservable: BehaviorSubject<Proposta>, auth: AuthService) => {
    const behavior = new BehaviorSubject<Array<MenuItem>>([
      {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
      {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}
    ]);

    propostaObservable.subscribe(proposta => {
      const isResponsavel = auth.getUser().id === proposta.responsavelId;
      const alertIcon = '<span class="badge badge-danger"><i class="align-middle ta-notification text-white"></i></span>';
      const awaitingIcon = '<span class="badge badge-warning"><i class="align-middle ta-ampulheta text-white"></i></span>';

      let menu_itens: Array<MenuItem> = [
        {path: 'detalhes', text: 'Detalhes da Demanda', icon: 'ta-search'},
        {path: 'condicoes', text: 'Condições Fundamentais para Fornecimento', icon: 'ta-ficha'}];

      if (proposta.dataClausulasAceitas !== null && (proposta.participacao === 1 || proposta.participacao === 3)) {

        let contratoAlert;
        let planoAlert;
        contratoAlert = proposta.captacaoStatus === 'Refinamento' && proposta.contratoAprovacao === 'Alteracao' ? alertIcon : '';
        planoAlert = proposta.captacaoStatus === 'Refinamento' && proposta.planoTrabalhoAprovacao === 'Alteracao' ? alertIcon : '';

        const getIcon = s => {
          switch (s) {
            case 'Pendente':
              return isResponsavel ? awaitingIcon : alertIcon;
            case 'Alteracao':
              return !isResponsavel ? awaitingIcon : alertIcon;
          }
          return null;
        };

        if (proposta.captacaoStatus === 'Refinamento') {
          contratoAlert = getIcon(proposta.contratoAprovacao);
          planoAlert = getIcon(proposta.planoTrabalhoAprovacao);
        }
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
          {path: 'contrato', text: `Validação Contrato`, icon: 'ta-gavel', afterText: contratoAlert},
          {path: 'envio', text: `Envio Proposta para aprovação`, icon: 'ta-ok', afterText: planoAlert},
        ];

      }
      behavior.next(menu_itens);
    });

    return behavior;
  },

};
export const TextsProvider: Provider[] = [
  {
    provide: COMPONENT_LABELS,
    useValue: PropostaTexts,
    multi: true
  },
  {
    provide: COMPONENT_LABELS,
    multi: true,
    deps: [[new Optional(), PROPOSTA_LABELS]],
    useFactory: (labels) => labels || new Map([])
  }
];
export const ActionOpenItem = {
  provide: TABLE_ACTIONS, deps: [PROPOSTA_CAN_EDIT], useFactory: canEdit => [
    {
      isLink: true,
      action: './#${id}',
      text: canEdit ? 'EDITAR' : 'Visualizar',
      icon: canEdit ? 'ta-edit' : 'ta-eye',
      className: 'btn btn-primary'
    }
  ]
};
