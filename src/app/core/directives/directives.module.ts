import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DownloadFileDirective} from '@app/core/directives/download-file.directive';
import {DynamicHostDirective} from '@app/core/directives/dynamic-host.directive';
import {UserAccessDirective} from '@app/core/directives/user-access.directive';


@NgModule({
  declarations: [
    DownloadFileDirective,
    DynamicHostDirective,
    //UserAccessDirective,
  ],
  exports: [
    DownloadFileDirective,
    DynamicHostDirective,
    // UserAccessDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule {
}
