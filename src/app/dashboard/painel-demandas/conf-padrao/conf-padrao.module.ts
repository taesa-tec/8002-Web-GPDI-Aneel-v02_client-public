import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoPdfComponent } from './documento-pdf/documento-pdf.component';

@NgModule({
  declarations: [DocumentoPdfComponent],
  exports: [DocumentoPdfComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})
export class ConfPadraoModule { }
