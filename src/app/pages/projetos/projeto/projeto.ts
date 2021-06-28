import {MenuItem, MenuItems, SIDEBAR_MENU, UserRole} from '@app/commons';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {BehaviorSubject} from 'rxjs';
import {InjectionToken, Provider, Optional} from '@angular/core';
import {AuthService} from '@app/services';


export const MenuItemAlterarProjeto: MenuItem = {text: 'Alterações Projeto', icon: 'ta-alert', path: `alteracoes`};
export const MenuItemConsultarDados: MenuItem = {text: 'Consultar Dados<br> Planejamento Projeto', icon: 'ta-eye', path: `consulta`};
export const MenuItemCentralAdministrativa: MenuItem = {
  text: 'Central<br> Administrativa',
  icon: 'ta-central-admin',
  path: `central-administrativa`
};

//<editor-fold desc="Execução">
export const MenuItemRefpNovo: MenuItem = {text: 'Inserir Registro <br> REFP', icon: 'ta-edit', path: `refp/novo`};
export const MenuItemRefpPendente: MenuItem = {text: 'Registros Pendentes <br> REFP', icon: 'ta-ampulheta', path: `refp/pendente`};
export const MenuItemRefpReprovado: MenuItem = {text: 'Registros Reprovados<br> REFP', icon: 'ta-cancel-circle', path: `refp/reprovado`};
export const MenuItemRefpAprovado: MenuItem = {text: 'Registros Aprovados<br> REFP', icon: 'ta-ok', path: `refp/aprovado`};
export const MenuItemExtrato: MenuItem = {text: 'Extrato Financeiro', icon: 'ta-extrato', path: `extrato`};
//</editor-fold>


//<editor-fold desc="Finalizado">
export const MenuItemRelatorioFinal: MenuItem = {text: 'Relatório Final Base Projeto', icon: 'ta-edit', path: `relatorio/final`};
export const MenuItemRelatorioEtapa: MenuItem = {text: 'Relatório Etapas Projeto', icon: 'ta-etapas', path: `relatorio/etapa`};
export const MenuItemResultadosCapacitacao: MenuItem = {
  text: 'Resultados Capacitação Profissional',
  icon: 'ta-user-id',
  path: `resultados/capacitacao`
};
export const MenuItemResultadosCientifico: MenuItem = {
  text: 'Resultados Produção Técnico Científica',
  icon: 'ta-tubo-ensaio',
  path: `resultados/cientifica`
};
export const MenuItemResultadosApoio: MenuItem = {text: 'Resultados Apoio', icon: 'ta-torre', path: `resultados/apoio`};
export const MenuItemResultadosIntelectual: MenuItem = {
  text: 'Resultados Propriedade Intelectual',
  icon: 'ta-lamp',
  path: `resultados/intelectual`
};
export const MenuItemResultadosSocioAmbientais: MenuItem = {
  text: 'Resultados Socioambientais',
  icon: 'ta-ambiente',
  path: `resultados/socioambientais`
};
export const MenuItemResultadosEconomicos: MenuItem = {
  text: 'Resultados Indicadores Econômicos',
  icon: 'ta-chart',
  path: `resultados/economicos`
};
//</editor-fold>


//<editor-fold desc="InjectionTokens">
export const PROJETO_EXECUCAO_MENU = new InjectionToken<Array<MenuItem> | BehaviorSubject<Array<MenuItem>>>('Projeto Menu Execução');
export const PROJETO_FINALIZADO_MENU = new InjectionToken<Array<MenuItem> | BehaviorSubject<Array<MenuItem>>>('Projeto Menu Finalizado');
export const PROJETO_IS_RESPONSAVEL = new InjectionToken<boolean>('Responsável pelo projeto');
//</editor-fold>


//<editor-fold desc="Providers">
export const SidebarMenuProvider: Provider = {
  provide: SIDEBAR_MENU,
  deps: [ProjetoService, [new Optional(), PROJETO_EXECUCAO_MENU], [new Optional(), PROJETO_FINALIZADO_MENU]],
  useFactory: (service: ProjetoService, menuExecucao: MenuItems, menuFinalizacao: MenuItems) => {
    const sidebar_menu = new BehaviorSubject([]);

    service.projeto.subscribe(projeto => {
      switch (projeto.status) {
        case 'Execucao':
          sidebar_menu.next(menuExecucao);
          break;
        case 'Finalizado':
          sidebar_menu.next(menuFinalizacao);
          break;
        default:
          sidebar_menu.next([]);
          break;

      }
    });
    return sidebar_menu;
  }
};

export const IsResponsavelProvider: Provider = {
  provide: PROJETO_IS_RESPONSAVEL,
  deps: [AuthService, ProjetoService],
  useFactory: (auth: AuthService, service: ProjetoService) => {
    const check = (p, u) => p !== undefined && (p.responsavelId === u.id || auth.userHasRoles(UserRole.Administrador));
    const behavior = new BehaviorSubject(check(service.getCurrentProjeto(), auth.getUser()));
    service.projeto.subscribe(p => {
      behavior.next(check(p, auth.getUser()));
    });
    return behavior;
  }
};
//</editor-fold>
