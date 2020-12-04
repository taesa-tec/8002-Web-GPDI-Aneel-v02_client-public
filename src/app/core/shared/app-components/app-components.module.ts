import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxMaskModule} from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {AppPipesModule} from '@app/core/shared/pipes/app-pipes.module';
import {RouterModule} from '@angular/router';

import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {HeaderComponent} from '@app/core/shared/app-components/header/header.component';
import {AccordionComponent} from '@app/core/shared/app-components/accordion/accordion.component';
import {TipComponent} from '@app/core/shared/app-components/tip/tip.component';
import {OrdersComponent} from '@app/core/shared/app-components/orders/orders.component';
import {TableComponent} from '@app/core/shared/app-components/table/table.component';
import {OrderContentComponent} from '@app/core/shared/app-components/order-content/order-content.component';


const components = [
  LoadingComponent,
  HeaderComponent,
  AccordionComponent,
  TipComponent,
  OrdersComponent,
  TableComponent,
  OrderContentComponent
];

@NgModule({
  declarations: components,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    AppPipesModule,
    FontAwesomeModule,
    NgbModule,
    NgxMaskModule,
    NgxCurrencyModule,
  ],
  exports: components
})
export class AppComponentsModule {
}
