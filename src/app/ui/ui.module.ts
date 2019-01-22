import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SharedModule } from '@app/shared/shared.module';
import { UiService } from './ui.service';

@NgModule({
    declarations: [AlertComponent, ConfirmComponent],
    imports: [
        SharedModule,
        CommonModule
    ],
    entryComponents: [AlertComponent, ConfirmComponent],
    exports: [AlertComponent, ConfirmComponent],
    providers: [
        UiService
    ]
})
export class UiModule { }
