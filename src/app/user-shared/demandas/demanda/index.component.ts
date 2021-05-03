import {Component, Inject, OnInit} from '@angular/core';
import {DemandaEtapa, DemandaEtapaStatus} from '@app/user-shared/demandas/commons';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@app/services';
import {DEMANDA} from '@app/user-shared/demandas/demanda/providers';
import {Demanda} from '@app/commons/demandas';

@Component({
  selector: 'app-index',
  template: 'Carregando'
})
export class IndexComponent implements OnInit {

  constructor(
    @Inject(DEMANDA) protected demanda: Demanda,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute) {
  }

  ngOnInit(): void {

    let urlParts: Array<any>;
    if (this.demanda.criadorId === this.auth.user.id) {
      if (this.demanda.superiorDiretoId) {
        if (this.demanda.status === DemandaEtapaStatus.Reprovada || this.demanda.etapaAtual !== DemandaEtapa.Elaboracao) {
          urlParts = ['aprovacao'];
        } else {
          urlParts = ['formulario', 'especificacao-tecnica'];
        }
      } else {
        urlParts = ['equipe-validacao'];
      }
    } else {
      urlParts = [this.demanda.status !== DemandaEtapaStatus.ReprovadaPermanente ? 'aprovacao' : 'historico'];
    }
    this.router.navigate(['./', ...urlParts], {relativeTo: this.route}).then();
  }

}
