import {Component, Inject, OnInit} from '@angular/core';
import {Proposta, Roles, UserRole} from '@app/commons';
import {CaptacaoIdProvider, PROPOSTA, PROPOSTA_CAN_EDIT, PropostaProvider, PropostaSidebar} from './shared';
import {BehaviorSubject} from 'rxjs';
import {EtapasService} from '@app/users-modules/fornecedor/services/propostas.service';
import {AuthService} from '@app/services';


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

  backLink = '/';

  constructor(@Inject(PROPOSTA) public propostaObservable: BehaviorSubject<Proposta>, protected auth: AuthService) {
    if (auth.hasRoles(UserRole.Fornecedor)) {
      this.backLink = '/propostas';
    } else {
      this.backLink = '/refinamento';
    }
  }

  ngOnInit() {
    this.propostaObservable.subscribe(data => {
      this.proposta = data;
    });
  }

}
