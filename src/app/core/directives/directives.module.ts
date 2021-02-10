import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DownloadFileDirective} from '@app/core/directives/download-file.directive';
import {DynamicHostDirective} from '@app/core/directives/dynamic-host.directive';


@NgModule({
  declarations: [
    DownloadFileDirective,
    DynamicHostDirective,
    //HasRoleDirective,
  ],
  exports: [
    DownloadFileDirective,
    DynamicHostDirective,
    // HasRoleDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule {
}
