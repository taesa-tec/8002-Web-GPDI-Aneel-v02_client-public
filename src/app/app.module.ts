import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
        DashboardModule,
        UsersModule,
        ProjetosModule,
        AppRoutingModule,
    ],
    exports: [SharedModule],
    providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIG_DEV },
        httpInterceptorProviders,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
