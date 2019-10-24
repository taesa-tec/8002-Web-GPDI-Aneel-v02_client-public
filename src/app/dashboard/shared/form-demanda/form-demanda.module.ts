import { NgModule } from '@angular/core';

import { FormDemandaComponent } from './form-demanda.component';
import { SharedModule } from '@app/core/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  exports: [FormDemandaComponent],
  declarations: [FormDemandaComponent],
  providers: [],
})
export class FormDemandasModule { }
