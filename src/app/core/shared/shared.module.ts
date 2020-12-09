import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CKEditorModule} from 'ckeditor4-angular';
import {NgxMaskModule} from 'ngx-mask';
import {FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {customCurrencyMaskConfig} from '@app/app.config';
import {NgxCurrencyModule} from 'ngx-currency';
import {httpInterceptorProviders} from '@app/core/http-interceptors';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  providers: [httpInterceptorProviders],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbModule,
    NgxMaskModule,
    NgxCurrencyModule,
    FontAwesomeModule,
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
