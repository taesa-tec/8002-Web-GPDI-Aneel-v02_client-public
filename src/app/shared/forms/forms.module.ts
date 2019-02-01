import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as BaseFormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea/textarea.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [TextareaComponent, UploadImageComponent],
  imports: [
    CommonModule,
    BaseFormsModule,
  ],
  exports: [TextareaComponent, UploadImageComponent]
})
export class FormsModule { }
