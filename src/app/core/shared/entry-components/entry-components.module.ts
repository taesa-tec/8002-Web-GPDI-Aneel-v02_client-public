import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormsModule as AppFormsModule} from '@app/core/shared/forms/forms.module';


import {AlertComponent} from '@app/core/shared/entry-components/alert/alert.component';
import {ConfirmComponent} from '@app/core/shared/entry-components/confirm/confirm.component';
import {PromptComponent} from '@app/core/shared/entry-components/prompt/prompt.component';
import {ModalPageComponent} from '@app/core/shared/entry-components/modal-page/modal-page.component';
import {AppComponentsModule} from '@app/core/shared/app-components/app-components.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxMaskModule} from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {AppPipesModule} from '@app/core/shared/pipes/app-pipes.module';
import {FileUploaderComponent} from '@app/core/shared/entry-components/file-uploader/file-uploader.component';


const components = [
  AlertComponent,
  ConfirmComponent,
  PromptComponent,
  ModalPageComponent,
  FileUploaderComponent
];

@NgModule({
  declarations: components,
  entryComponents: components,
  imports: [
    CommonModule,
    AppComponentsModule,
    AppPipesModule,
    FormsModule,
    ReactiveFormsModule,
    AppFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgxMaskModule,
    NgxCurrencyModule,
  ]
})
export class EntryComponentsModule {
}
