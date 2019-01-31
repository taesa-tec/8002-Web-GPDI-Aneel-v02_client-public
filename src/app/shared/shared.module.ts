import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { TipComponent } from './tip/tip.component';
import { TextareaComponent } from './forms/textarea/textarea.component';
import { NotDefinedPipe } from './pipes/not-defined.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';


library.add(fas, far);

@NgModule({
    declarations: [
        LoadingComponent,
        AccordionComponent,
        AlertComponent,
        ConfirmComponent,
        TipComponent,
        TextareaComponent,

        NotDefinedPipe,

        OrderByPipe,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot()
    ],
    entryComponents: [AlertComponent, ConfirmComponent],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule,
        NgxMaskModule,
        FontAwesomeModule,

        LoadingComponent,
        AccordionComponent,
        AlertComponent,
        ConfirmComponent,
        TipComponent,
        TextareaComponent,

        NotDefinedPipe,
        OrderByPipe
    ]
})
export class SharedModule { }
