import {NgModule} from '@angular/core';
import {SharedModule} from '@app/core/shared/shared.module';

import {PlanoTrabalhoRoutingModule} from './plano-trabalho-routing.module';
import {PlanoTrabalhoComponent} from './plano-trabalho.component';
import {CoreModule} from '@app/core';
import {PlanoTrabalhoResolver} from '@app/propostas/proposta/resolvers';


@NgModule({
  declarations: [PlanoTrabalhoComponent],
  imports: [
    SharedModule,
    PlanoTrabalhoRoutingModule,
    CoreModule
  ],
  providers: [PlanoTrabalhoResolver]
})
export class PlanoTrabalhoModule {
}
