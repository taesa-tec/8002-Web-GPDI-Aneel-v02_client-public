import {Component, Inject, Input, OnInit} from '@angular/core';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {Proposta} from '@app/commons';
import {AuthService} from '@app/services';
import {BehaviorSubject} from 'rxjs';

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
  canEdit: boolean;

  constructor(@Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>, protected service: PropostasService, protected auth: AuthService) {
  }

  get status() {
    return this.type === 'Contrato' ? this.proposta?.contratoAprovacao : this.proposta?.planoTrabalhoAprovacao;
  }


  ngOnInit(): void {
    this.propostaCanEdit.subscribe(can => this.canEdit = can);
    this.service.proposta.subscribe(p => {
      this.proposta = p;
      this.isResponsavel = this.auth.getUser().id === p.responsavelId;
    });
    this.description = this.type === 'Contrato' ? 'Contrato' : 'Plano de trabalho';
  }

}
