import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefinamentoComponent} from './refinamento/refinamento.component';
import {ComentariosComponent} from './refinamento/comentarios/comentarios.component';
import {AprovadorComponent} from './refinamento/aprovador/aprovador.component';
import {PipesModule} from '@app/core/pipes';
import {FormsModule} from '@app/core/components/forms';
import {AlteracoesComponent} from '@app/proposta/components/refinamento/alteracoes/alteracoes.component';

@NgModule({
  declarations: [RefinamentoComponent, ComentariosComponent, AprovadorComponent, AlteracoesComponent],
  exports: [
    RefinamentoComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule
  ]
})
export class ComponentsModule {
}
