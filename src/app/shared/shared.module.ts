import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';


library.add(fas, far);

@NgModule({
    declarations: [LoadingComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        HttpClientModule
    ],
    exports: [
        FontAwesomeModule,
        NgbModule,
        HttpClientModule,
        LoadingComponent
    ]

})
export class SharedModule { }
