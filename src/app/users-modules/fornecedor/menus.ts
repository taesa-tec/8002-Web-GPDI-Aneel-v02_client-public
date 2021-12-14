import {HEADER_MENU, SIDEBAR_MENU} from '@app/commons';
import {
  MenuItemConsultarDados,
  MenuItemRefpAprovado,
  MenuItemRefpNovo,
  MenuItemRefpPendente,
  MenuItemRefpReprovado,
  MenuItemRelatorioEtapa,
  MenuItemRelatorioFinal,
  MenuItemResultadosApoio,
  MenuItemResultadosCapacitacao,
  MenuItemResultadosCientifico, MenuItemResultadosEconomicos, MenuItemResultadosIntelectual, MenuItemResultadosSocioAmbientais,
  PROJETO_EXECUCAO_MENU,
  PROJETO_FINALIZADO_MENU
} from '@app/pages/projetos/projeto/projeto';
import {Execucao, MeuCadastro, Refinamento} from '@app/users-modules/shared/menus';

export const SidebarMenu = {
  provide: SIDEBAR_MENU,
  useValue: [
    {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/propostas`},
    Refinamento,
    Execucao
  ]
};

export const HeaderMenu = {
  provide: HEADER_MENU,
  useValue: [
    MeuCadastro
  ]
};

export const ProjetoExecucaoMenu = {
  provide: PROJETO_EXECUCAO_MENU,
  useValue: [
    MenuItemRefpNovo,
    MenuItemRefpPendente,
    MenuItemRefpReprovado,
    MenuItemRefpAprovado,
    MenuItemConsultarDados
  ]
};
export const ProjetoFinalizadoMenu = {
  provide: PROJETO_FINALIZADO_MENU,
  useValue: [
    MenuItemRelatorioFinal,
    MenuItemRelatorioEtapa,
    MenuItemResultadosCapacitacao,
    MenuItemResultadosCientifico,
    MenuItemResultadosApoio,
    MenuItemResultadosIntelectual,
    MenuItemResultadosSocioAmbientais,
    MenuItemResultadosEconomicos
  ]
};
