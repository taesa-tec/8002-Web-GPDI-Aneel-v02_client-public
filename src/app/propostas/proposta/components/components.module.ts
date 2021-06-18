import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefinamentoComponent} from './refinamento/refinamento.component';
import {ComentariosComponent} from './refinamento/comentarios/comentarios.component';
import {AprovadorComponent} from './refinamento/aprovador/aprovador.component';
import {PipesModule} from '@app/core/pipes';
import {FormsModule} from '@app/core/components/forms';
import {AlteracoesComponent} from '@app/propostas/proposta/components/refinamento/alteracoes/alteracoes.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RefinamentoComponent, ComentariosComponent, AprovadorComponent, AlteracoesComponent],
  exports: [
    RefinamentoComponent,
    ComentariosComponent,
    AlteracoesComponent
  ],
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ComponentsModule {
}
