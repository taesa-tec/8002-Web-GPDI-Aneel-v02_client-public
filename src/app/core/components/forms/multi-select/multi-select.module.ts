import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import { MultiSelectOptionComponent } from './multi-select-option/multi-select-option.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from '@app/core/pipes';



@NgModule({
    declarations: [MultiSelectComponent, MultiSelectOptionComponent],
  exports: [
    MultiSelectComponent,
    MultiSelectOptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
  ]
})
export class MultiSelectModule { }
