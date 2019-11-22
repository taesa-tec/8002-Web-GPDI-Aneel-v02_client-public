import {NgModule} from '@angular/core';
import {LoggerService} from '@app/services/logger.service';
import {SharedModule} from '@app/core/shared/shared.module';
import {LoggerDirective, LoggerItemDirective} from './logger.directive';
import {LogFormatPipe} from '@app/dashboard/projeto/logger/log-format.pipe';

@NgModule({
    declarations: [LoggerDirective, LoggerItemDirective, LogFormatPipe],
    exports: [LoggerDirective, LoggerItemDirective, LogFormatPipe],
    imports: [],
    providers: [LoggerService]
})
export class LoggerModule {
}
