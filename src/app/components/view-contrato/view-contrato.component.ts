import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContratosService} from '@app/services';
import {ContratoPadrao} from '@app/commons';

@Component({
  selector: 'app-view-contrato',
  templateUrl: './view-contrato.component.html',
  styleUrls: ['./view-contrato.component.scss']
})
export class ViewContratoComponent implements OnInit {

  contrato: ContratoPadrao;
  contratoId: any;
  loading = false;

  constructor(public activeModal: NgbActiveModal, protected service: ContratosService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.service.obter<ContratoPadrao>(this.contratoId).then(contrato => {
      this.contrato = contrato;
    }).catch(e => {
      console.error(e);
      this.activeModal.close();
    }).finally(() => this.loading = false);
  }

}
