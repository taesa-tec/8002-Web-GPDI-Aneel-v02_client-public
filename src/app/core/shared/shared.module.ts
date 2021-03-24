import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgxMaskModule} from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {customCurrencyMaskConfig} from '@app/app.config';
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
