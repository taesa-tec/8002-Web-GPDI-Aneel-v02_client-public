import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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


library.add(fas, far);

@NgModule({
    declarations: [LoadingComponent, AccordionComponent, AlertComponent, ConfirmComponent, TipComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        HttpClientModule
    ],
    entryComponents: [AlertComponent, ConfirmComponent],
    exports: [
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        LoadingComponent,
        AccordionComponent,
        AlertComponent,
        ConfirmComponent,
        TipComponent,
    ]

})
export class SharedModule { }
