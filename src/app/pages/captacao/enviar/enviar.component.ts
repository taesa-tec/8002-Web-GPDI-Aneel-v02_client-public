import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enviar-selecao',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.scss']
})
export class EnviarComponent {

  projeto: any;

  constructor(public activeModal: NgbActiveModal) {
  }
}
