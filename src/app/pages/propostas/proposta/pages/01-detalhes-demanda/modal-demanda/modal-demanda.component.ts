import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-demanda',
  templateUrl: './modal-demanda.component.html',
  styleUrls: ['./modal-demanda.component.scss']
})
export class ModalDemandaComponent {
  form = new FormGroup({
    confirm: new FormControl(false, Validators.requiredTrue)
  });
  status = 0;

  constructor(public activeModal: NgbActiveModal) {
  }

  confirmarParticipacao() {
    this.status = 1;
  }

  confirmarRejeicao() {
    this.status = 2;
  }
}
