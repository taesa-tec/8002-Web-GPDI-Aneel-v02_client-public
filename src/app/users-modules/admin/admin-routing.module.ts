import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '@app/dashboard';
import {
  CaptacoesRoute,
  ConfiguracaoRoute, DemandasRoute,
  GerenciarUsuariosRoute,
  MeuCadastroRoute,
  NotFoundRoute,
  ProjetosRoute, PropostaFormalizacaoRoute,
  PropostaRefinamentoRoute, PropostaRiscosRoute, PropostaSelecaoRoute, RedirectRoute
} from '@app/routes/routes';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      RedirectRoute('demandas'),
      MeuCadastroRoute,
      DemandasRoute,
      CaptacoesRoute,
      PropostaSelecaoRoute,
      PropostaRefinamentoRoute,
      PropostaRiscosRoute,
      PropostaFormalizacaoRoute,
      ProjetosRoute,
      ConfiguracaoRoute,
      GerenciarUsuariosRoute,
      NotFoundRoute
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
