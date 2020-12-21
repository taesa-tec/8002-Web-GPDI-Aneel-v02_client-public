import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-cancelar-captacao',
  templateUrl: './modal-cancelar-captacao.component.html',
  styleUrls: ['./modal-cancelar-captacao.component.scss']
})
export class ModalCancelarCaptacaoComponent implements OnInit {

  isCheck: boolean = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  toggle(e) {
    this.isCheck = e.target.checked;
  }

}
