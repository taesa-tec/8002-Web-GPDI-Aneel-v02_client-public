import {Component, Inject, OnInit, Optional} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ModalDemandaComponent} from './modal-demanda/modal-demanda.component';
import {environment} from '@env/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {PROPOSTA, PROPOSTA_CAN_EDIT} from '@app/proposta/shared';
import {BehaviorSubject} from 'rxjs';
import {Proposta} from '@app/commons';
import {AppService} from '@app/services';


@Component({
  selector: 'app-detalhes-demanda',
  templateUrl: './detalhes-demanda.component.html',
  styleUrls: ['./detalhes-demanda.component.scss']
})
export class DetalhesDemandaComponent implements OnInit {

  get pdfUrl() {
    if (this.proposta) {
      return `${environment.api_url}/Propostas/${this.proposta.guid}/Detalhes/Pdf/especificacao-tecnica`;
    }
    return null;
  }

  detalhes: any;

  proposta: Proposta;

  constructor(private modal: NgbModal,
              private app: AppService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected service: PropostasService,
              @Inject(PROPOSTA) public propostaObservable: BehaviorSubject<Proposta>,
              @Optional() @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean
  ) {
  }

  ngOnInit() {
    //this.pdfUrl = `${environment.api_url}/Propostas/${this.proposta.guid}/Detalhes/Pdf/especificacao-tecnica`;
    this.route.data.subscribe(data => {
      this.detalhes = data.detalhes;
    });
    this.propostaObservable.subscribe(proposta => {
      this.proposta = proposta;
    });
  }

  async rejeitar() {
    try {
      const ref = this.modal.open(ModalDemandaComponent);
      const cmp = ref.componentInstance as ModalDemandaComponent;
      cmp.confirmarRejeicao();
      const result = await ref.result;
      if (result) {
        await this.service.rejeitar(this.proposta.guid);
        this.router.navigate(['/']).then();
        // request...
      }
    } catch (e) {
      this.app.alertError('Ocorreu um erro, tente novamente mais tarde!').then();
      console.error(e);
    }
  }

  async participar() {
    try {
      const ref = this.modal.open(ModalDemandaComponent);
      const cmp = ref.componentInstance as ModalDemandaComponent;
      cmp.confirmarParticipacao();
      const result = await ref.result;
      if (result) {
        await this.service.participar(this.proposta.guid);
        this.proposta.participacao = 1;
        // request...
      }
    } catch (e) {
      this.app.alertError('Ocorreu um erro, tente novamente mais tarde!').then();
      console.error(e);
    }
  }

}
