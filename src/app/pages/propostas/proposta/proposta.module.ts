import {NgModule} from '@angular/core';
import {PropostaRoutingModule} from './proposta-routing.module';
import {PropostaResolver} from '@app/pages/propostas/proposta/resolvers/proposta.resolver';
import {PropostasService} from './services/propostas.service';
import {CoreModule} from '@app/core';
import {PropostaComponent} from './proposta.component';
import {DashboardModule} from '@app/dashboard';
import {PropostasResolver} from '@app/pages/propostas/proposta/resolvers/propostas.resolver';
import {PROPOSTA, PROPOSTA_CAN_EDIT, PropostaProvider, TextsProvider} from '@app/pages/propostas/proposta/shared';
import {ContratoService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {AuthService} from '@app/services';
import {BehaviorSubject} from 'rxjs';
import {Proposta} from '@app/commons';


@NgModule({
  declarations: [PropostaComponent],
  imports: [
    CoreModule,
    DashboardModule,
    PropostaRoutingModule
  ],
  providers: [
    PropostasService,
    PropostaProvider,
    TextsProvider,
    PropostasResolver,
    PropostaResolver,
    ContratoService,
    {
      provide: PROPOSTA_CAN_EDIT,
      deps: [PROPOSTA, AuthService],
      useFactory: (p: BehaviorSubject<Proposta>, auth: AuthService) => {
        const behavior = new BehaviorSubject<boolean>(false);
        p.subscribe(proposta => {
          const responsavelId = proposta?.responsavelId;
          const userId = auth.getUser()?.id;
          const canEdit = userId != null &&
            userId === responsavelId &&
            (
              proposta.captacaoStatus === 'Fornecedor' ||
              (proposta.captacaoStatus === 'Refinamento' && proposta.planoTrabalhoAprovacao === 'Alteracao')
            );
          behavior.next(canEdit);
        });
        return behavior;

      }
    }
  ],

})
export class PropostaModule {
}
