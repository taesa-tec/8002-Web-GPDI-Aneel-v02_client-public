import {Component, Inject, OnInit} from '@angular/core';
import {NovaDemandaComponent} from '@app/pages/demandas/nova-demanda/nova-demanda.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EquipePeD, User} from '@app/commons';
import {AuthService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-demandas',
  templateUrl: './demandas.component.html',
  styleUrls: ['./demandas.component.scss']
})
export class GestaoDeDemandasComponent implements OnInit {

  menu: Array<any>;
  showChild = true;
  equipe: EquipePeD;
  protected user: User;
  hasEquipe = false;

  constructor(protected auth: AuthService, protected modal: NgbModal, protected route: ActivatedRoute, protected router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.equipe = data.equipe;
      this.hasEquipe = this.equipe.gerente != null && this.equipe.diretor != null && this.equipe.coordenador != null;
    });
    this.user = this.auth.user;
    this.menu = [
      {text: 'Em Elaboração', path: 'elaboracao'},
      {text: 'Reprovadas', path: 'reprovadas'},
      {text: 'Aprovadas', path: 'aprovadas'},
      {text: 'Enviadas para Captação', path: 'enviadas-para-captacao'},
    ];
    this.route.fragment.subscribe(f => {
      if (f === 'novo') {
        this.novaDemanda().then();
      }
    });
  }


  async novaDemanda(demanda: any = {}) {
    const modalRef = this.modal.open(NovaDemandaComponent, {size: 'lg'});
    modalRef.componentInstance.demanda = demanda;
    this.showChild = false;
    try {
      await modalRef.result;
    } catch (e) {

    }
    this.showChild = true;

    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {relativeTo: this.route}).then();

  }
}
