import {NgModule} from '@angular/core';
import {LoggerService} from '@app/core/services/logger.service';
import {SharedModule} from '@app/core/shared/shared.module';
import {LoggerDirective, LoggerItemDirective} from './logger.directive';
import {LogFormatPipe} from '@app/logger/log-format.pipe';

@NgModule({
    declarations: [LoggerDirective, LoggerItemDirective, LogFormatPipe],
    exports: [LoggerDirective, LoggerItemDirective, LogFormatPipe],
    imports: [],
    providers: [LoggerService]
})
export class LoggerModule {
}
