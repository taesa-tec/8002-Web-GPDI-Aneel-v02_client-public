import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewContratoComponent} from '@app/user-shared/components/view-contrato/view-contrato.component';
import {CoreModule} from '@app/core';

const components = [
  ViewContratoComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CoreModule
  ],
  exports: [...components]
})
export class ComponentsModule {
}
