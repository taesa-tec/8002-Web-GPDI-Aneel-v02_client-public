import {Demanda} from '@app/commons/demandas';
import {MenuItem, SIDEBAR_MENU, UserRole} from '@app/commons';
import {DemandaEtapaStatus} from '@app/user-shared/demandas/commons';
import {FactoryProvider, InjectionToken, Provider} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@app/services';


function menu(demanda: Demanda, user): Array<MenuItem> {

  if (user.role === UserRole.Administrador) {
    return menuCriador([
      {text: 'Central Administrativa', icon: 'ta-central-admin', path: 'central-administrativa'},
      {text: 'Logs', icon: 'ta-log', path: 'logs'}
    ], demanda);
  }


  switch (user.id) {
    case demanda.criadorId:
      return menuCriador([], demanda);
    default:
      return menuAprovadores([], demanda);
  }
}

function menuCriador(_menu: Array<any>, demanda: Demanda) {
  return [
    {text: 'Definição Pessoas Processo Validação', icon: 'ta-user-id', path: 'equipe-validacao'},
    {text: 'Especificação Técnica', icon: 'ta-capacete', path: 'formulario/especificacao-tecnica'},
    {text: 'Documento e Aprovações', icon: 'ta-projeto', path: 'documento-aprovacoes'},
    ..._menu
  ];
}

function menuAprovadores(_menu: Array<any>, demanda: Demanda) {
  if (demanda.status !== DemandaEtapaStatus.ReprovadaPermanente) {
    return [
      {text: 'Processo Aprovação Demanda', icon: 'ta-projeto', path: 'aprovacao'},
      ..._menu
    ];
  }
  return [
    {text: 'Hístórico Demanda', icon: 'ta-projeto', path: 'historico'},
    ..._menu
  ];
}

export const DEMANDA = new InjectionToken<Demanda>('Demanda');

export const DemandaProvider: FactoryProvider = {
  provide: DEMANDA,
  deps: [ActivatedRoute],
  useFactory: (route: ActivatedRoute) => route.snapshot.data.demanda
};
export const DemandaMenuProvider: FactoryProvider = {
  provide: SIDEBAR_MENU,
  deps: [DEMANDA, AuthService],
  useFactory: (demanda: Demanda, auth: AuthService) => menu(demanda, auth.user)
};
