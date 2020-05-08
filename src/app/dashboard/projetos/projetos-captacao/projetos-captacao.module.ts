import { NgModule } from '@angular/core';
import { SharedModule } from '@app/dashboard/shared/shared.module';

import { ProjetosCaptacaoComponent } from './projetos-captacao.component';
import { ProjetosCaptacaoListComponent } from './projetos-captacao-list/projetos-captacao-list.component';
import { CriarCaptacaoComponent } from './shared/criar-captacao/criar-captacao.component';
import { EnviarSelecaoComponent } from './shared/enviar-selecao/enviar-selecao.component';
import { ProjetosCaptacaoRoutingModule } from './projetos-captacao-routing.module';

@NgModule({
  declarations: [
    ProjetosCaptacaoComponent,
    ProjetosCaptacaoListComponent,
    CriarCaptacaoComponent,
    EnviarSelecaoComponent,
  ],
  imports: [
    SharedModule,
    ProjetosCaptacaoRoutingModule,
  ],
  entryComponents: [
    CriarCaptacaoComponent,
    EnviarSelecaoComponent,
  ],
  
})
export class ProjetosCaptacaoModule { }
