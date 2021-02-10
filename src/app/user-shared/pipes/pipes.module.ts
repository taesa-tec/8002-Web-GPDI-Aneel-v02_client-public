import {NgModule} from '@angular/core';
import {CoreModule} from '@app/core';
import {LogFormatPipe} from '@app/user-shared/pipes/log-format.pipe';

const pipes = [
  LogFormatPipe
];

@NgModule({
  declarations: [...pipes],
  imports: [
    CoreModule
  ],
  exports: [...pipes]
})
export class PipesModule {
}
