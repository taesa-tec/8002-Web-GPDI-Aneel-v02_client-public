import {NovaDemandaComponent} from './nova-demanda/nova-demanda.component';
import {NgModule} from '@angular/core';

import {DemandasRoutingModule} from './demandas-routing.module';
import {ReprovadasComponent} from './reprovadas/reprovadas.component';
import {EnviadasParaCaptacaoComponent} from './enviadas-para-captacao/enviadas-para-captacao.component';
import {AprovadasComponent} from './aprovadas/aprovadas.component';
import {GestaoDeDemandasComponent} from './demandas.component';

import {ElaboracaoComponent} from './elaboracao/elaboracao.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DemandasListComponent} from './demandas-list/demandas-list.component';
import {DemandaProgressComponent} from './demanda-progress/demanda-progress.component';
import {DemandaProgressEtapaComponent} from './demanda-progress/demanda-progress-etapa/demanda-progress-etapa.component';
import {CoreModule} from '@app/core';
import {DemandaGuard} from '@app/demandas/demanda/guards/demanda.guard';
import {DemandaResolver} from '@app/demandas/demanda/demanda.resolver';
import {DemandaModule} from '@app/demandas/demanda/demanda.module';
import {SharedModule} from '@app/dashboard/shared';

@NgModule({
  declarations: [
    ReprovadasComponent,
    EnviadasParaCaptacaoComponent,
    AprovadasComponent,
    GestaoDeDemandasComponent,
    ElaboracaoComponent,
    NovaDemandaComponent,
    DemandasListComponent,
    DemandaProgressComponent,
    DemandaProgressEtapaComponent

  ],
  exports: [
    GestaoDeDemandasComponent
  ],
  entryComponents: [
    NovaDemandaComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    DemandasRoutingModule,
    DemandaModule,
    ReactiveFormsModule,
  ],
  providers: [DemandaGuard, DemandaResolver]
})
export class DemandasModule {
}
