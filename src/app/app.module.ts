import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import * as moment from 'moment';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgModule, LOCALE_ID} from '@angular/core';
import localeBr from '@angular/common/locales/pt';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './core/components/not-found/not-found.component';
import {IndexComponent} from './index.component';
import {SharedModule} from '@app/core/shared';
import {ComponentsModule} from '@app/core/components';


registerLocaleData(localeBr, 'pt');
moment.locale('pt-br');


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
