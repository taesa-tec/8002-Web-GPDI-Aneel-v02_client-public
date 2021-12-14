import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule as BaseFormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextareaComponent} from './textarea/textarea.component';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {DirectivesModule} from '@app/core/directives';
import {PipesModule} from '@app/core/pipes';
import {FileListComponent} from '@app/core/components/forms/file-list/file-list.component';
import { MonthYearSelectorComponent } from './month-year-selector/month-year-selector.component';

const components = [TextareaComponent, UploadImageComponent, CheckboxComponent, UploadFileComponent, FileListComponent];

@NgModule({
  declarations: [...components, MonthYearSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseFormsModule,
    PipesModule,
    DirectivesModule,
  ],
  exports: [...components, MonthYearSelectorComponent]
})
export class FormsModule {
}
