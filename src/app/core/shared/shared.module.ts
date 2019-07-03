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

import {customCurrencyMaskConfig} from '@app/app.config';
import {NgxCurrencyModule} from 'ngx-currency';
import {FileService} from '@app/core/services/file.service';
import {DownloadFileDirective, DynamicHostDirective, UserAccessDirective} from './directives';
import {ErrorComponent} from './screens/error.component';
import {DebugComponent} from './screens/debug.component';
import {httpInterceptorProviders} from '@app/core/http-interceptors';
import {EntryComponentsModule} from '@app/core/shared/entry-components/entry-components.module';
import {AppComponentsModule} from '@app/core/shared/app-components/app-components.module';
import {AppPipesModule} from '@app/core/shared/pipes/app-pipes.module';


library.add(fas, far);

@NgModule({
    declarations: [
        DownloadFileDirective,
        DynamicHostDirective,
        UserAccessDirective,

        ErrorComponent,
        DebugComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        EntryComponentsModule,
        AppFormsModule,
        AppPipesModule,
        AppComponentsModule,
        NgbModule,

        FormsModule,

        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ],
    providers: [FileService, httpInterceptorProviders],
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
        AppComponentsModule,
        AppPipesModule,

        // Coponentes
        ErrorComponent,
        DebugComponent,

        // Directives
        DynamicHostDirective,
        DownloadFileDirective,
        UserAccessDirective


    ]
})
export class SharedModule {
}
