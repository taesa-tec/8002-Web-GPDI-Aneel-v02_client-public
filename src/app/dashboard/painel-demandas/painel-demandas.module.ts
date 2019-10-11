import { NovoProjetoComponent } from '@app/core/shared/novo-projeto/novo-projeto.component';
import { NgModule } from '@angular/core';

import { CommonModule } from './../projeto/common/common.module';
import { PainelDemandasRoutingModule } from './painel-demandas-routing.module';
import { UsersModule } from './../../users/users.module';
import { SharedModule } from './../../core/shared/shared.module';
import { PainelDemandasComponent } from './painel-demandas.component';
import { ProjetoEmPropostaComponent } from './projeto-em-proposta/projeto-em-proposta.component';
import { ProjetoIniciadoComponent } from './projeto-iniciado/projeto-iniciado.component';
import { ProjetoEncerradoComponent } from './projeto-encerrado/projeto-encerrado.component';


@NgModule({
  declarations: [
    PainelDemandasComponent,
    ProjetoEmPropostaComponent,
    ProjetoIniciadoComponent,
    ProjetoEncerradoComponent,
  ],
  imports: [
    SharedModule,
    UsersModule,
    PainelDemandasRoutingModule,
    CommonModule,
  ]
})
export class PainelDemandasModule { }
