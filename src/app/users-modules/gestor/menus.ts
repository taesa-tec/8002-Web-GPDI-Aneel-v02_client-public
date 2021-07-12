import {HEADER_MENU, SIDEBAR_MENU} from '@app/commons';
import {
  MenuItemAlterarProjeto, MenuItemCentralAdministrativa,
  MenuItemConsultarDados, MenuItemExtrato,
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
import {
  Aprovacao,
  Captacoes,
  Demandas,
  Execucao,
  Finalizacao,
  Refinamento,
  Riscos,
  Selecao
} from '@app/users-modules/shared/menus';


export const SidebarMenu = {
  provide: SIDEBAR_MENU,
  useValue: [
    Demandas,
    Captacoes,
    Selecao,
    Refinamento,
    Riscos,
    Aprovacao,
    Execucao,
    Finalizacao,
  ]
};

export const HeaderMenu = {
  provide: HEADER_MENU,
  useValue: [
    {text: 'Meu Cadastro', icon: 'ta-user-o', path: `/meu-cadastro`}
  ]
};

export const ProjetoExecucaoMenu = {
  provide: PROJETO_EXECUCAO_MENU,
  useValue: [
    MenuItemRefpNovo,
    MenuItemRefpPendente,
    MenuItemRefpReprovado,
    MenuItemRefpAprovado,
    MenuItemAlterarProjeto,
    MenuItemExtrato,
    MenuItemConsultarDados,
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
    MenuItemResultadosEconomicos,
    MenuItemConsultarDados,
  ]
};
