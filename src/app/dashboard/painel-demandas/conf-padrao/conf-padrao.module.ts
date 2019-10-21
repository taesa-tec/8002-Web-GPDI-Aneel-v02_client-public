import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { DocumentoPdfComponent } from './documento-pdf/documento-pdf.component';

@NgModule({
  declarations: [EditorFormComponent, DocumentoPdfComponent],
  exports:[EditorFormComponent,DocumentoPdfComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})
export class ConfPadraoModule { }
