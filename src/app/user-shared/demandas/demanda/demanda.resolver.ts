import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {Injectable} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {DemandaEtapaStatus} from '@app/user-shared/demandas/commons';
import {Roles, UserRole} from '@app/commons';
import {UsersService} from '@app/services/users.service';

@Injectable()
export class DemandaResolver implements Resolve<{ demanda: Demanda, menu: Array<any>, defaultPage?: string }> {
  constructor(protected app: AppService, protected usersService: UsersService) {
  }


  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<{ demanda: Demanda, menu: Array<any>, defaultPage?: string }> {
    // Menu
    // Demanda
    // Superior Direto, Revisor, Coordenador, Gerente, Diretor
    const demanda = await this.app.demandas.getDemanda(parseFloat(route.paramMap.get('id'))).toPromise();
    const equipe = await this.app.sistema.getEquipePeD();
    const menu = this.menu(demanda, equipe);
    const defaultPage = this.defaultPage(demanda, equipe);
    return {demanda, menu, defaultPage};
  }

  protected defaultPage(demanda: Demanda, equipe): string {
    const user = this.usersService.currentUser;

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
    const user = this.usersService.currentUser;
    if (user.role === UserRole.Administrador) {
      return this.menuCriador([
        {text: 'Central Administrativa', icon: 'ta-central-admin', path: 'central-administrativa'},
        {text: 'Logs', icon: 'ta-log', path: 'logs'}
      ], demanda);
    }


    switch (user.id) {
      case demanda.criadorId:
        return this.menuCriador([], demanda);
      case demanda.superiorDiretoId:
      case demanda.revisorId:
      case equipe.coordenador.id:
      case equipe.diretor.id:
      case equipe.gerente.id:
        return this.menuAprovadores([], demanda);
      default:
        return this.menuAprovadores([], demanda);
    }
  }

  protected menuCriador(menu: Array<any>, demanda: Demanda) {
    return [
      {text: 'Definição Pessoas Processo Validação', icon: 'ta-user-id', path: 'equipe-validacao'},
      {text: 'Especificação Técnica', icon: 'ta-capacete', path: 'formulario/especificacao-tecnica'},
      {text: 'Documento e Aprovações', icon: 'ta-projeto', path: 'documento-aprovacoes'},
      ...menu
    ];
  }

  protected menuAprovadores(menu: Array<any>, demanda: Demanda) {
    console.log(demanda);
    if (demanda.status !== DemandaEtapaStatus.ReprovadaPermanente) {
      return [
        {text: 'Processo Aprovação Demanda', icon: 'ta-projeto', path: 'aprovacao'},
        ...menu
      ];
    }
    return [
      {text: 'Hístórico Demanda', icon: 'ta-projeto', path: 'historico'},
      ...menu
    ];
  }
}
