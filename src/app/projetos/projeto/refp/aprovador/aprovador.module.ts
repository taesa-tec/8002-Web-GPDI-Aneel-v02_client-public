import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AprovadorComponent} from './aprovador/aprovador.component';


@NgModule({
  declarations: [AprovadorComponent],
  exports: [AprovadorComponent],
  imports: [
    CommonModule
  ]
})
export class AprovadorModule {
}
