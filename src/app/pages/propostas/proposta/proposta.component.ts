import {Component, Inject, OnInit} from '@angular/core';
import {Proposta} from '@app/commons';
import {CaptacaoIdProvider, PROPOSTA, PROPOSTA_CAN_EDIT, PropostaProvider, PropostaSidebar} from './shared';
import {BehaviorSubject} from 'rxjs';
import {EtapasService} from '@app/users-modules/fornecedor/services/propostas.service';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './proposta.component.html',
  viewProviders: [PropostaProvider],
  providers: [
    PropostaProvider,
    EtapasService,
    CaptacaoIdProvider,
    PropostaSidebar,
  ],

})
export class PropostaComponent implements OnInit {
  proposta: Proposta;

  constructor(@Inject(PROPOSTA) public propostaObservable: BehaviorSubject<Proposta>) {
  }

  ngOnInit() {
    this.propostaObservable.subscribe(data => {
      this.proposta = data;
    });
  }

}
