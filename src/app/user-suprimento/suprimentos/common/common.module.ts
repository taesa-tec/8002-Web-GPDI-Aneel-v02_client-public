import { NgModule } from '@angular/core';
import { SharedModule } from '@app/dashboard/shared/shared.module';
import { DetalhesProjetoComponent } from './detalhes-projeto/detalhes-projeto.component';
import { GerenciamentoPropostasModule } from './gerenciamento-propostas/gerenciamento-propostas.module';


@NgModule({
  declarations: [
    DetalhesProjetoComponent
  ],
  imports: [
    SharedModule,
    GerenciamentoPropostasModule
  ]
})
export class CommonModule { }
