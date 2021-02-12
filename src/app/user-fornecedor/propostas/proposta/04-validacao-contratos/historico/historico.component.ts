import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styles: []
})
export class HistoricoComponent implements OnInit {
  loading = false;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
