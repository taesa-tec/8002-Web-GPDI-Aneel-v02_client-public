import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enviar-selecao',
  templateUrl: './enviar-selecao.component.html',
  styleUrls: ['./enviar-selecao.component.scss']
})
export class EnviarSelecaoComponent implements OnInit {

  projeto: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
