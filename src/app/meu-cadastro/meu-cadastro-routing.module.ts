import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MeuCadastroComponent} from '@app/meu-cadastro/meu-cadastro.component';
import {DashboardComponent} from '@app/dashboard';


const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: MeuCadastroComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeuCadastroRoutingModule {
}
