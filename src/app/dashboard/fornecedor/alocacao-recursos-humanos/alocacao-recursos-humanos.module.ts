import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { AlocacaoRecursosHumanosRoutingModule } from './alocacao-recursos-humanos-routing.module';
import { AlocacaoRecursosHumanosComponent } from './alocacao-recursos-humanos.component';
import { AlocarRecursoHumanoFormComponent } from './alocar-recurso-humano-form/alocar-recurso-humano-form.component';


@NgModule({
  declarations: [
    AlocacaoRecursosHumanosComponent,
    AlocarRecursoHumanoFormComponent
  ],
  imports: [
    SharedModule,
    AlocacaoRecursosHumanosRoutingModule
  ]
})
export class AlocacaoRecursosHumanosModule { }
