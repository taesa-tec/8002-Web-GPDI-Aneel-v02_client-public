import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {
  MainComponent,
  ListaProjetosComponent,
  ProjetoCardComponent,
  MeusProjetosComponent,
  NovoProjetoComponent
} from '@app/dashboard/shared/components';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {ByRoleComponent, RedirectByRoleComponent} from './by-role/by-role.component';

const components = [
  ListaProjetosComponent,
  MainComponent,
  MeusProjetosComponent,
  NovoProjetoComponent,
  ProjetoCardComponent,
  ByRoleComponent,
  RedirectByRoleComponent
];

@NgModule({
  declarations: [
    ...components,

  ],
  imports: [CoreModule, DirectivesModule],
  exports: [...components],

})
export class ComponentsModule {
}
