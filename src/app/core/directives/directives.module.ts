import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicHostDirective} from '@app/core/directives/dynamic-host.directive';
import {DraggerDirective} from '@app/core/directives/dragger.directive';


@NgModule({
  declarations: [
    DynamicHostDirective,
    DraggerDirective
    //HasRoleDirective,
  ],
  exports: [
    DynamicHostDirective,
    DraggerDirective
    // HasRoleDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule {
}
