import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicHostDirective} from '@app/core/directives/dynamic-host.directive';


@NgModule({
  declarations: [
    DynamicHostDirective,
    //HasRoleDirective,
  ],
  exports: [
    DynamicHostDirective,
    // HasRoleDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule {
}
