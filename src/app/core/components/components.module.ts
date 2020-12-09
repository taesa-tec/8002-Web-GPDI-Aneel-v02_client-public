import {NgModule} from '@angular/core';
import {PipesModule} from '@app/core/pipes';
import {DirectivesModule} from '@app/core/directives';
import {AccordionComponent} from '@app/core/components/accordion/accordion.component';
import {AlertComponent} from '@app/core/components/alert/alert.component';
import {ConfirmComponent} from '@app/core/components/confirm/confirm.component';
import {FileUploaderComponent} from '@app/core/components/file-uploader/file-uploader.component';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {ModalPageComponent} from '@app/core/components/modal-page/modal-page.component';
import {OrderContentComponent} from '@app/core/components/order-content/order-content.component';
import {OrdersComponent} from '@app/core/components/orders/orders.component';
import {PromptComponent} from '@app/core/components/prompt/prompt.component';
import {TableComponent} from '@app/core/components/table/table.component';
import {TipComponent} from '@app/core/components/tip/tip.component';
import {DebugComponent} from '@app/core/components/screens/debug.component';
import {ErrorComponent} from '@app/core/components/screens/error.component';
import {SharedModule} from '@app/core/shared';

const components = [
  AccordionComponent,
  AlertComponent,
  ConfirmComponent,
  DebugComponent,
  ErrorComponent,
  FileUploaderComponent,
  LoadingComponent,
  ModalPageComponent,
  OrderContentComponent,
  OrdersComponent,
  PromptComponent,
  TableComponent,
  TipComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    SharedModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [...components, SharedModule],

})
export class ComponentsModule {
}
