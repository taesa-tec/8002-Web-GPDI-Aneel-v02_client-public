import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugComponent} from '@app/core/screens/debug.component';
import {ErrorComponent} from '@app/core/screens/error.component';
import {NotFoundComponent} from '@app/core/screens/not-found.component';


@NgModule({
  declarations: [DebugComponent, ErrorComponent, NotFoundComponent],
  exports: [DebugComponent, ErrorComponent, NotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class ScreensModule {
}
