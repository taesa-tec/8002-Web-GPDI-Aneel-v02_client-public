import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


library.add(fas, far);

@NgModule({
    declarations: [LoadingComponent, AccordionComponent, AlertComponent, ConfirmComponent, TipComponent, TextareaComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [AlertComponent, ConfirmComponent],
    exports: [
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingComponent,
        AccordionComponent,
        AlertComponent,
        ConfirmComponent,
        TipComponent,
        TextareaComponent
    ]
})
export class SharedModule { }
