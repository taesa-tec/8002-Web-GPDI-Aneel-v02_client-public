import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RefpRoutingModule} from './refp-routing.module';
import {NovoComponent} from './novo/novo.component';
import {DashboardModule} from '@app/dashboard';
import {RecursoHumanoComponent} from './novo/recurso-humano.component';
import {RecursoMaterialComponent} from './novo/recurso-material.component';
import {CoreModule} from '@app/core';
import {ListaComponent} from './lista/lista.component';
import {RegistroObservacoesResolver, RegistroResolver, RegistrosResolver} from '@app/projetos/projeto/resolvers/registros.resolver';
import {AprovadorModule} from '@app/projetos/projeto/refp/aprovador/aprovador.module';
import {DetalhesModule} from '@app/projetos/projeto/refp/detalhes/detalhes.module';
import {EditarModule} from '@app/projetos/projeto/refp/editar/editar.module';


@NgModule({
  declarations: [NovoComponent, RecursoHumanoComponent, RecursoMaterialComponent, ListaComponent],
  imports: [
    CommonModule,
    AprovadorModule,
    DetalhesModule,
    EditarModule,
    RefpRoutingModule,
    DashboardModule,
    CoreModule
  ],
  providers: [
    RegistrosResolver.ToStatus('Pendentes', 'registrosPendentes'),
    RegistrosResolver.ToStatus('Reprovados', 'registrosReprovados'),
    RegistrosResolver.ToStatus('Aprovados', 'registrosAprovados'),
    RegistroResolver.AsInfo(false, RegistroResolver),
    RegistroResolver.AsInfo(true, 'registroInfo'),
    RegistroObservacoesResolver
  ]
})
export class RefpModule {
}
