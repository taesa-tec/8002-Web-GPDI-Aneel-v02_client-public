import {Component, Inject, OnInit} from '@angular/core';
import {NovaDemandaComponent} from '@app/user-shared/demandas/nova-demanda/nova-demanda.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '@app/commons';
import {AuthService} from '@app/services';


@Component({
  selector: 'app-demandas',
  templateUrl: './demandas.component.html',
  styleUrls: ['./demandas.component.scss']
})
export class GestaoDeDemandasComponent implements OnInit {

  menu: Array<any>;
  showChild = true;
  protected user: User;

  constructor(protected auth: AuthService, protected modal: NgbModal) {
  }

  ngOnInit() {
    this.user = this.auth.user;
    this.menu = [
      {text: 'Em Elaboração', path: 'elaboracao'},
      {text: 'Reprovadas', path: 'reprovadas'},
      {text: 'Aprovadas', path: 'aprovadas'},
      {text: 'Enviadas para Captação', path: 'enviadas-para-captacao'},
    ];
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
  }
}
