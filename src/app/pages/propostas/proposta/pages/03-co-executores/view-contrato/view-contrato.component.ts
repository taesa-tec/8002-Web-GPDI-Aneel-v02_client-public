import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-contrato',
  templateUrl: './view-contrato.component.html',
  styleUrls: ['./view-contrato.component.scss']
})
export class ViewContratoComponent {

  contrato: any;

  constructor(public activeModal: NgbActiveModal) {
  }
}
