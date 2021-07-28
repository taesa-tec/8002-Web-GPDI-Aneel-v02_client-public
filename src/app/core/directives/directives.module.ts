import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicHostDirective} from '@app/core/directives/dynamic-host.directive';
import {DraggerDirective} from '@app/core/directives/dragger.directive';
import {PermissionDirective} from './permission.directive';


@NgModule({
  declarations: [
    DynamicHostDirective,
    DraggerDirective,
    PermissionDirective,
    //HasRoleDirective,
  ],
    exports: [
        DynamicHostDirective,
        DraggerDirective,
        PermissionDirective,
        // HasRoleDirective,
    ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule {
}

