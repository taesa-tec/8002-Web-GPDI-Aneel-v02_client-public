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

export const SidebarMenu = {
  provide: SIDEBAR_MENU,
  useValue: [
    {text: 'Projetos - Captação de Propostas', icon: 'ta-extrato', path: `/propostas`},
    {text: 'Projetos - Refinamento', icon: 'ta-file-check', path: `/refinamento`},
    {text: 'Projetos - Em execução', icon: 'ta-file-check', path: `/projetos/em-execucao`},
    {text: 'Projetos - Em finalização', icon: 'ta-file-check', path: `/projetos/em-finalizacao`},
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
