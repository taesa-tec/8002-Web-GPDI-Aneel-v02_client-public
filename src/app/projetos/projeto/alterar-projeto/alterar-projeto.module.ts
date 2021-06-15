import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlterarProjetoRoutingModule} from './alterar-projeto-routing.module';
import {DashboardModule} from '@app/dashboard';
import {MenuItem, TOPNAV_MENU} from '@app/commons';
import {ProrrogarComponent} from './prorrogar/prorrogar.component';
import {RecursosHumanosComponent} from './recursos-humanos/recursos-humanos.component';
import {RecursosMateriaisComponent} from './recursos-materiais/recursos-materiais.component';
import {ProjetoNodeResolver} from '@app/projetos/projeto/resolvers/projeto.resolver';
import {CoreModule} from '@app/core';
import {MultiSelectModule} from '@app/core/components/forms/multi-select/multi-select.module';

const menu: Array<MenuItem> = [
  {
    text: 'Prorrogar',
    path: 'prorrogar',
  },
  {
    text: 'Alterar Recursos Humanos',
    path: 'recursos-humanos',
  },
  {
    text: 'Alterar Recursos Materiais',
    path: 'recursos-materiais',
  },

];

@NgModule({
  declarations: [ProrrogarComponent, RecursosHumanosComponent, RecursosMateriaisComponent],
  imports: [
    CommonModule,
    DashboardModule,
    AlterarProjetoRoutingModule,
    CoreModule,
    MultiSelectModule
  ],
  providers: [
    {
      provide: TOPNAV_MENU,
      useValue: menu
    },
    ProjetoNodeResolver.Node('Produtos', 'projetoProdutos'),
    ProjetoNodeResolver.Node('Empresas', 'projetoEmpresas'),
    ProjetoNodeResolver.Node('Recursos/Humanos', 'projetoRH'),
    ProjetoNodeResolver.Node('Recursos/Humanos/${fragment}#', 'projetoRH_Item'),
    ProjetoNodeResolver.Node('Recursos/Materiais', 'projetoRM'),
    ProjetoNodeResolver.Node('Recursos/Materiais/${fragment}#', 'projetoRM_Item'),
  ]
})
export class AlterarProjetoModule {
}
