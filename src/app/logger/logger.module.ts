import {NgModule} from '@angular/core';
import {LoggerService} from '@app/logger/logger.service';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
    declarations: [],
    imports: [
        SharedModule
    ],
    providers: [LoggerService]
})
export class LoggerModule {
}
