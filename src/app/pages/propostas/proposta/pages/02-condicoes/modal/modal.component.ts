import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  form = new FormGroup({
    confirm: new FormControl(false, Validators.requiredTrue)
  });

  constructor(public activeModal: NgbActiveModal) {
  }
}
