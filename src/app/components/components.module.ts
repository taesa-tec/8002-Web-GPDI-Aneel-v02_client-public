import {NgModule} from '@angular/core';
import {ViewContratoComponent} from '@app/components/view-contrato/view-contrato.component';
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
