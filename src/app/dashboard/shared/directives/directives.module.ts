import {NgModule} from '@angular/core';
import {HasRoleDirective} from '@app/dashboard/shared/directives/has-role.directive';
import {CoreModule} from '@app/core';

@NgModule({
  declarations: [HasRoleDirective],
  imports: [CoreModule],
  exports: [HasRoleDirective]
})
export class DirectivesModule {

}
