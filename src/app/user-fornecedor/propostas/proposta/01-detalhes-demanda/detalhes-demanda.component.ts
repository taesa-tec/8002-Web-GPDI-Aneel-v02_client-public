import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ModalDemandaComponent} from './modal-demanda/modal-demanda.component';
import {environment} from '@env/environment';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';


@Component({
  selector: 'app-detalhes-demanda',
  templateUrl: './detalhes-demanda.component.html',
  styleUrls: ['./detalhes-demanda.component.scss']
})
export class DetalhesDemandaComponent implements OnInit {

  pdfUrl = null;
  detalhes: any;

  get proposta() {
    return this.parent.proposta;
  }

  constructor(private modal: NgbModal, private parent: PropostaComponent, protected route: ActivatedRoute,
              protected router: Router,
              protected service: PropostasService) {
  }

  ngOnInit() {
    this.pdfUrl = `${environment.api_url}/Fornecedor/Propostas/${this.proposta.captacaoId}/Detalhes/Pdf/especificacao-tecnica`;
    this.route.data.subscribe(data => {
      this.detalhes = data.detalhes;
    });
  }

  async rejeitar() {
    try {
      const ref = this.modal.open(ModalDemandaComponent);
      const cmp = ref.componentInstance as ModalDemandaComponent;
      cmp.confirmarRejeicao();
      const result = await ref.result;
      if (result) {
        await this.service.rejeitar(this.proposta.captacaoId);
        this.router.navigate(['/']).then();
        // request...
      }
    } catch (e) {

    }
  }

  async participar() {
    try {
      const ref = this.modal.open(ModalDemandaComponent);
      const cmp = ref.componentInstance as ModalDemandaComponent;
      cmp.confirmarParticipacao();
      const result = await ref.result;
      if (result) {
        await this.service.participar(this.proposta.captacaoId);
        this.proposta.participacao = 1;
        // request...
      }
    } catch (e) {

    }
  }

}
