import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DevelopmentComponent} from '@app/user-fornecedor/propostas/proposta/development/development.component';
import {SidebarComponent} from '@app/dashboard/side-bar/sidebar.component';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';

/*
Detalhes
Condições fundamentais
Cadastro Co-Executores
Validação contrato
Plano de trabalho
Escopo
Produtos
Etapas
Tabela de Riscos
Recursos Humanos
Alocação de Recursos Humanos
Recursos Materiais
Alocação de Recursos Materiais
Envio Proposta para aprovação
 */
const routes: Routes = [
  {
    path: '',
    component: PropostaComponent,
    children: [
      {path: 'detalhes', component: DevelopmentComponent},
      {path: 'condicoes', component: DevelopmentComponent},
      {path: 'co-executores', component: DevelopmentComponent},
      {path: 'contrato', component: DevelopmentComponent},
      {path: 'plano-de-trabalho', component: DevelopmentComponent},
      {path: 'escopo', component: DevelopmentComponent},
      {path: 'produtos', component: DevelopmentComponent},
      {path: 'etapas', component: DevelopmentComponent},
      {path: 'riscos', component: DevelopmentComponent},
      {path: 'recursos-humanos', component: DevelopmentComponent},
      {path: 'alocacao-recursos-humanos', component: DevelopmentComponent},
      {path: 'recursos-materiais', component: DevelopmentComponent},
      {path: 'alocacao-recursos-materiais', component: DevelopmentComponent},
      {path: 'envio', component: DevelopmentComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostaRoutingModule {
}
