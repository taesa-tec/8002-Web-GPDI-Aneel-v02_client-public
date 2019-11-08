import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule as BaseFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextareaComponent} from './textarea/textarea.component';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {AppPipesModule} from '@app/core/shared/pipes/app-pipes.module';

@NgModule({
  declarations: [TextareaComponent, UploadImageComponent, CheckboxComponent, UploadFileComponent],
  imports: [
    CommonModule,
    BaseFormsModule,
    AppPipesModule
  ],
  exports: [TextareaComponent, UploadImageComponent, CheckboxComponent, UploadFileComponent]
})
export class FormsModule {
}
