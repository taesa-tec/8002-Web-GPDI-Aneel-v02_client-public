import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import localeBr from '@angular/common/locales/pt';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from '@app/core/shared/shared.module';
import {UsersModule} from './users/users.module';
import {AppService} from './core/services/app.service';
import {registerLocaleData} from '@angular/common';
import * as moment from 'moment';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule} from '@app/logger/logger.module';

registerLocaleData(localeBr, 'pt');
moment.locale('pt-br');


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        AuthModule,
        UsersModule,
        LoggerModule,
        AppRoutingModule,

    ],
    exports: [SharedModule],
    providers: [
        {provide: LOCALE_ID, useValue: 'pt'},
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
