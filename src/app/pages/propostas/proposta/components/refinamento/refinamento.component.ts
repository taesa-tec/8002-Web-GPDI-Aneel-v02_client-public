import {Component, Inject, Input, OnInit} from '@angular/core';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {Proposta} from '@app/commons';
import {AuthService} from '@app/services';

@Component({
  selector: 'app-refinamento',
  templateUrl: './refinamento.component.html',
  styleUrls: ['./refinamento.component.scss']
})
export class RefinamentoComponent implements OnInit {

  @Input() type: 'Contrato' | 'Plano';
  proposta: Proposta;
  description: string;
  isResponsavel: boolean;

  constructor(@Inject(PROPOSTA_CAN_EDIT) public canEdit, protected service: PropostasService, protected auth: AuthService) {
  }

  get status() {
    return this.type === 'Contrato' ? this.proposta?.contratoAprovacao : this.proposta?.planoTrabalhoAprovacao;
  }


  ngOnInit(): void {
    this.service.proposta.subscribe(p => {
      this.proposta = p;
      this.isResponsavel = this.auth.getUser().id === p.responsavelId;
    });
    this.description = this.type === 'Contrato' ? 'Contrato' : 'Plano de trabalho';
  }

}
