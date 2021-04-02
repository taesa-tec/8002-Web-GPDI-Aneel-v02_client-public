import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  ContratoPadraoFormComponent
} from '@app/user-admin/configuracoes/contratos-padrao/contrato-padrao-form/contrato-padrao-form.component';
import {ContratosPadraoComponent} from '@app/user-admin/configuracoes/contratos-padrao/contratos-padrao.component';
import {ContratosPadroesResolver} from '@app/resolvers/contratos-padroes.resolver';
import {ContratoPadraoResolver} from '@app/resolvers/contrato-padrao.resolver';
import {ContratoShortcodesResolver} from '@app/user-admin/resolvers/contrato-shortcodes.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      contratos: ContratosPadroesResolver,
    },
    component: ContratosPadraoComponent
  },
  {
    path: 'novo',
    component: ContratoPadraoFormComponent,
    resolve: {
      shortcodes: ContratoShortcodesResolver
    },
  },
  {
    path: 'editar/:id',
    resolve: {
      contrato: ContratoPadraoResolver,
      shortcodes: ContratoShortcodesResolver
    },
    component: ContratoPadraoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosPadraoRoutingModule {
}
