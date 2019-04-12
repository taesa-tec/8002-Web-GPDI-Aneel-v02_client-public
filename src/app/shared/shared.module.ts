import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NgxMaskModule} from 'ngx-mask';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule as AppFormsModule} from './forms/forms.module';

import {LoadingComponent} from './loading/loading.component';
import {AccordionComponent} from './accordion/accordion.component';
import {AlertComponent} from './alert/alert.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {TipComponent} from './tip/tip.component';
import {NotDefinedPipe} from './pipes/not-defined.pipe';
import {OrderByPipe} from './pipes/order-by.pipe';
import {OrdersComponent} from './helper/orders/orders.component';
import {TipoProjetoPipe} from './pipes/tipo-projeto.pipe';
import {customCurrencyMaskConfig} from '@app/app.config';
import {NgxCurrencyModule} from 'ngx-currency';
import {FileService} from './file.service';
import {DownloadFileDirective} from './download-file.directive';
import {PromptComponent} from './prompt/prompt.component';
import {DynamicHostDirective} from './dynamic-host.directive';
import {N2arrayPipe} from './pipes/n2array.pipe';
import {ErrorComponent} from './screens/error.component';
import {DebugComponent} from './screens/debug.component';
import {HeaderComponent} from './header/header.component';
import {ModalPageComponent} from './modal-page/modal-page.component';


library.add(fas, far);

@NgModule({
    declarations: [
        LoadingComponent,
        HeaderComponent,
        AccordionComponent,
        AlertComponent,
        ConfirmComponent,
        TipComponent,
        OrdersComponent,
        // Pipes
        NotDefinedPipe,
        OrderByPipe,
        TipoProjetoPipe,
        DownloadFileDirective,
        PromptComponent,
        DynamicHostDirective,
        N2arrayPipe,
        ErrorComponent,
        DebugComponent,
        ModalPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        NgbModule,

        FormsModule,
        AppFormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ],
    entryComponents: [AlertComponent, ConfirmComponent, PromptComponent, ModalPageComponent],
    providers: [FileService],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule,
        NgxMaskModule,
        NgxCurrencyModule,
        FontAwesomeModule,
        AppFormsModule,

        // Coponentes
        LoadingComponent,
        HeaderComponent,
        AccordionComponent,
        AlertComponent,
        ConfirmComponent,
        PromptComponent,
        TipComponent,
        OrdersComponent,
        ErrorComponent,
        DebugComponent,

        // Pipes
        NotDefinedPipe,
        OrderByPipe,
        TipoProjetoPipe,
        N2arrayPipe,

        // Directives
        DynamicHostDirective,
        DownloadFileDirective


    ]
})
export class SharedModule {
}
