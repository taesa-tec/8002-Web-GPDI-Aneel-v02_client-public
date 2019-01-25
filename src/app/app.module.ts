import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosModule } from './projetos/projetos.module';
import { SharedModule } from './shared/shared.module';
import { APP_CONFIG, APP_CONFIG_DEV } from './app.config';
import { CatalogoService } from './catalogo.service';
import { UsersService } from './users.service';
import { httpInterceptorProviders } from './http-interceptors';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        AuthModule,
        DashboardModule,
        ProjetosModule,
        AppRoutingModule,
        SharedModule
    ],
    exports: [SharedModule],
    providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIG_DEV },
        httpInterceptorProviders,
        CatalogoService,
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
