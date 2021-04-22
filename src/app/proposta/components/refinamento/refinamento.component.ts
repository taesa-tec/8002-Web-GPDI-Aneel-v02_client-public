import {Component, Inject, OnInit} from '@angular/core';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {Proposta} from '@app/commons';

@Component({
  selector: 'app-refinamento',
  templateUrl: './refinamento.component.html',
  styleUrls: ['./refinamento.component.scss']
})
export class RefinamentoComponent implements OnInit {

  proposta: Proposta;

  constructor(@Inject(PROPOSTA_CAN_EDIT) public canEdit, protected service: PropostasService) {
  }

  ngOnInit(): void {
    this.service.proposta.subscribe(p => this.proposta = p);
  }

}
