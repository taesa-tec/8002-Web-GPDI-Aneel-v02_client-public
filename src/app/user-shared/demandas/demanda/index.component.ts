import {Component, OnInit} from '@angular/core';
import {DemandaComponent} from '@app/user-shared/demandas/demanda/demanda.component';
import {DemandaEtapaStatus} from '@app/user-shared/demandas/commons';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@app/services';

@Component({
  selector: 'app-index',
  template: 'Carregando'
})
export class IndexComponent implements OnInit {
  constructor(
    protected component: DemandaComponent,
    protected auth: AuthService,
    protected router: Router,
    protected route: ActivatedRoute) {
  }

  ngOnInit(): void {

    let urlParts: Array<any>;
    if (this.component.demanda.criadorId === this.auth.user.id) {
      urlParts = this.component.demanda.superiorDiretoId ? ['formulario', 'especificacao-tecnica'] : ['equipe-validacao'];
    } else {
      urlParts = [this.component.demanda.status !== DemandaEtapaStatus.ReprovadaPermanente ? 'aprovacao' : 'historico'];
    }
    this.router.navigate(['./', ...urlParts], {relativeTo: this.route}).then();
  }

}
