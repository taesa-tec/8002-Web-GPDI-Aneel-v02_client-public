import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import * as moment from 'moment';
import {HttpClientModule} from '@angular/common/http';
import {currentUserProvider} from '@app/providers/user.provider';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgModule, LOCALE_ID} from '@angular/core';
import localeBr from '@angular/common/locales/pt';

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {CoreModule} from '@app/core';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AppService} from './services/app.service';


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
    CoreModule,
    AuthModule,
    UsersModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    AppService,
    currentUserProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
