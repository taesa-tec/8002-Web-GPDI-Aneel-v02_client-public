import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-multi-select-option',
  template: '',
  styles: []
})
export class MultiSelectOptionComponent implements OnInit {

  @Input() value;
  @Input() label;

  constructor() {
  }

  ngOnInit(): void {
  }

}
