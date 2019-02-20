import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeBr from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjetosModule } from './projetos/projetos.module';
import { SharedModule } from './shared/shared.module';
import { APP_CONFIG, APP_CONFIG_DEV } from './app.config';
import { httpInterceptorProviders } from './http-interceptors';
import { UsersModule } from './users/users.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { AppService } from './app.service';
import { registerLocaleData } from '@angular/common';
import * as moment from 'moment';

registerLocaleData(localeBr, 'pt');
moment.locale('pt-br');


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AuthModule,
        CatalogsModule,
        ProjetosModule,
        DashboardModule,
        UsersModule,
        AppRoutingModule,
        
    ],
    exports: [SharedModule],
    providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIG_DEV },
        { provide: LOCALE_ID, useValue: 'pt' },
        httpInterceptorProviders,
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
