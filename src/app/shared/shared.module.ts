import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

library.add(fas, far);

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
    ],
    exports: [
        FontAwesomeModule,
        NgbModule
    ]
})
export class SharedModule { }
