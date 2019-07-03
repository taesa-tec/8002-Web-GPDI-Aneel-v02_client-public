import {NgModule} from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import {SharedModule} from '@app/core/shared/shared.module';
import {LoggerDirective, LoggerItemDirective} from './logger.directive';

@NgModule({
    declarations: [LoggerDirective, LoggerItemDirective],
    exports: [LoggerDirective, LoggerItemDirective],
    imports: [

    ],
    providers: [LoggerService]
})
export class LoggerModule {
}
