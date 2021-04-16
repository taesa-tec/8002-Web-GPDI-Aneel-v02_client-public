import {Component, Inject, OnInit} from '@angular/core';
import {Proposta} from '@app/commons';
import {EtapasService, PropostasService} from '@app/proposta/services/propostas.service';
import {CaptacaoIdProvider, PROPOSTA, PropostaProvider, PropostaSidebar} from './shared';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-suprimentos',
  templateUrl: './proposta.component.html',
  viewProviders: [],
  providers: [
    PropostasService.forUser(),
    EtapasService,
    CaptacaoIdProvider,
    PropostaProvider,
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
