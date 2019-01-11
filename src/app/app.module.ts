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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
