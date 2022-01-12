import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-multi-select-option',
  template: '',
  styles: []
})
export class MultiSelectOptionComponent {

  @Input() value;
  @Input() label;
}
