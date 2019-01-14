import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerComponent } from 'ngx-spinner';

library.add(fas, far);

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        NgxSpinnerModule
    ],
    exports: [
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        NgxSpinnerModule
    ]

})
export class SharedModule { }
