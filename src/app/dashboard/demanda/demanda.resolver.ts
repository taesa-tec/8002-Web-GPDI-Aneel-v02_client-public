import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Demanda } from '@app/models/demandas';
import { Injectable } from '@angular/core';
import { AppService } from '@app/services/app.service';
import { DemandaEtapaStatus } from '@app/dashboard/demandas/commons';
import { Roles, UserRole } from '@app/models';

@Injectable({ providedIn: 'root' })
export class DemandaResolver implements Resolve<{ demanda: Demanda, menu: Array<any>, defaultPage?: string }> {
  constructor(protected app: AppService) {
  }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ demanda: Demanda, menu: Array<any>, defaultPage?: string }> {
    // Menu
    // Demanda
    // Superior Direto, Revisor, Coordenador, Gerente, Diretor
    const demanda = await this.app.demandas.getDemanda(parseFloat(route.paramMap.get('id'))).toPromise();
    const equipe = await this.app.sistema.getEquipePeD();
    const menu = this.menu(demanda, equipe);
    const defaultPage = this.defaultPage(demanda, equipe);
    return { demanda, menu, defaultPage };
  }

  protected defaultPage(demanda: Demanda, equipe): string {
    const user = this.app.users.currentUser;

    switch (user.id) {
      case demanda.criadorId:
        if (demanda.superiorDiretoId) {
          return 'formulario/especificacao-tecnica';
        } else {
          return 'equipe-validacao';
        }
      case demanda.superiorDiretoId:
      case demanda.revisorId:
      case equipe.coordenador.id:
      case equipe.diretor.id:
      case equipe.gerente.id:
        return demanda.status !== DemandaEtapaStatus.ReprovadaPermanente ? 'aprovacao' : 'historico';
      default:
        return demanda.status !== DemandaEtapaStatus.ReprovadaPermanente ? 'aprovacao' : 'historico';
    }
  }

  protected menu(demanda: Demanda, equipe): Array<any> {
    const user = this.app.users.currentUser;
    const menu = user.role === UserRole.Administrador ? [
      { text: 'Central Administrativa', icon: 'ta-central-admin', path: 'central-administrativa' },
      { text: 'Logs', icon: 'ta-log', path: 'logs' }
    ] : [];
    switch (user.id) {
      case demanda.criadorId:
        return this.menuCriador(menu, demanda);
      case demanda.superiorDiretoId:
      case demanda.revisorId:
      case equipe.coordenador.id:
      case equipe.diretor.id:
      case equipe.gerente.id:
        return this.menuAprovadores(menu, demanda);
      default:
        return this.menuAprovadores([], demanda);
    }
  }

  protected menuCriador(menu: Array<any>, demanda: Demanda) {
    return [
      { text: 'Definição Pessoas Processo Validação', icon: 'ta-user-id', path: 'equipe-validacao' },
      { text: 'Especificação Técnica', icon: 'ta-capacete', path: 'formulario/especificacao-tecnica' },
      { text: 'Documento e Aprovações', icon: 'ta-projeto', path: 'documento-aprovacoes' },
      ...menu
    ];
  }

  protected menuAprovadores(menu: Array<any>, demanda: Demanda) {
    if (demanda.status !== DemandaEtapaStatus.ReprovadaPermanente) {
      return [
        { text: 'Processo Aprovação Demanda', icon: 'ta-projeto', path: 'aprovacao' },
        ...menu
      ];
    }
    return [
      { text: 'Hístórico Demanda', icon: 'ta-projeto', path: 'historico' },
      ...menu
    ];
  }
}
