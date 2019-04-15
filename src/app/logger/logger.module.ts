import {NgModule} from '@angular/core';
import {LoggerService} from '@app/logger/logger.service';
import {SharedModule} from '@app/shared/shared.module';
import {LoggerDirective, LoggerItemDirective} from './logger.directive';

@NgModule({
    declarations: [LoggerDirective, LoggerItemDirective],
    exports: [LoggerDirective, LoggerItemDirective],
    imports: [
        SharedModule
    ],
    providers: [LoggerService]
})
export class LoggerModule {
}
