import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {
  MainComponent,
} from '@app/dashboard/shared/components';
import {DirectivesModule} from '@app/dashboard/shared/directives';
import {ByRoleComponent, RedirectByRoleComponent} from './by-role/by-role.component';

const components = [
  MainComponent,
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
