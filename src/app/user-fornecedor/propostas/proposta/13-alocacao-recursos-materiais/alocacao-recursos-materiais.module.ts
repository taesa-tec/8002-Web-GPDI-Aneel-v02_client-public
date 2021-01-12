import { NgModule } from '@angular/core';

import { SharedModule } from '@app/dashboard/shared/shared.module';
import { AlocacaoRecursosMateriaisRoutingModule } from './alocacao-recursos-materiais-routing.module';
import { AlocacaoRecursosMateriaisComponent } from './alocacao-recursos-materiais.component';
import { AlocarRecursoMaterialFormComponent } from './alocar-recurso-material-form/alocar-recurso-material-form.component';


@NgModule({
  declarations: [
    AlocacaoRecursosMateriaisComponent,
    AlocarRecursoMaterialFormComponent
  ],
  imports: [
    SharedModule,
    AlocacaoRecursosMateriaisRoutingModule
  ]
})
export class AlocacaoRecursosMateriaisModule { }
