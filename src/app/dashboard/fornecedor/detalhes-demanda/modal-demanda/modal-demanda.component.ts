import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-demanda',
  templateUrl: './modal-demanda.component.html',
  styleUrls: ['./modal-demanda.component.scss']
})
export class ModalDemandaComponent implements OnInit {

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
