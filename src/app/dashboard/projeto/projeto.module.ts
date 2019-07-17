import {NgModule} from '@angular/core';

import {SharedModule} from '@app/core/shared/shared.module';
import {ProjetoRoutingModule} from './projeto-routing.module';
import {ProjetoComponent} from '@app/dashboard/projeto/projeto.component';
import {LogProjetoComponent} from '@app/dashboard/projeto/log-projeto/log-projeto.component';
import {LogComponent} from '@app/dashboard/projeto/log-projeto/log.component';
import {LoggerModule} from '@app/logger/logger.module';


@NgModule({
    declarations: [ProjetoComponent, LogProjetoComponent, LogComponent],
    imports: [
        SharedModule,
        LoggerModule,
        ProjetoRoutingModule,
    ]
})
export class ProjetoModule {
}
