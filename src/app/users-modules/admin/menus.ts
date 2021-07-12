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
  Demandas, Captacoes, Selecao, Refinamento, Riscos, Aprovacao, Execucao, Finalizacao, Configuracao
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
    Configuracao
  ]
};

export const HeaderMenu = {
  provide: HEADER_MENU,
  useValue: [
    {text: 'Gerenciar Usuários', icon: 'ta-group', path: `/gerenciar-usuarios`},
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
    MenuItemCentralAdministrativa,
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
    MenuItemCentralAdministrativa
  ]
};
