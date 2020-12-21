import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proposta-detalhes',
  templateUrl: './proposta-detalhes.component.html',
  styleUrls: ['./proposta-detalhes.component.scss']
})
export class PropostaDetalhesComponent implements OnInit {

  proposta: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
