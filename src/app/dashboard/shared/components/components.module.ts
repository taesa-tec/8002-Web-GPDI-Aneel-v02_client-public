import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {ByRoleComponent, RedirectByRoleComponent} from './by-role/by-role.component';

const components = [
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
