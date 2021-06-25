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

export const SidebarMenu = {
  provide: SIDEBAR_MENU,
  useValue: [
    {text: 'Gestão de Demandas', icon: 'ta-projeto', path: `/demandas`},
    {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/captacoes`},
    {text: 'Projetos - Priorização e Seleção', icon: 'ta-file-check', path: `/selecao`},
    {text: 'Projetos - Refinamento', icon: 'ta-file-check', path: `/refinamento`},
    {text: 'Projetos - Identificação e medição de riscos ', icon: 'ta-file-check', path: `/identificacao-riscos`},
    {text: 'Projetos - Aprovação e Formalização ', icon: 'ta-file-check', path: `/formalizacao`},
    {text: 'Projetos - Em execução', icon: 'ta-file-check', path: `/projetos/em-execucao`},
    {text: 'Projetos - Em finalização', icon: 'ta-file-check', path: `/projetos/em-finalizacao`},
    //{text: 'Configurações do Sistema', icon: 'ta-gear', path: `/configuracoes`},
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
