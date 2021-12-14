import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-month-year-selector',
  templateUrl: './month-year-selector.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearSelectorComponent),
      multi: true
    }
  ],
})
export class MonthYearSelectorComponent implements OnInit, ControlValueAccessor {


  // tslint:disable-next-line:ban-types variable-name
  protected _onChange: Function;
  // tslint:disable-next-line:ban-types variable-name
  protected _onTouch: Function;

  @Input() minYear = 0;

  form = this.fb.group({
    year: [(new Date()).getFullYear()],
    month: ['']
  });

  constructor(protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      const date = new Date(value.year, value.month, 1, 0, 0, 0);
      if (this._onChange) {
        this._onChange(date.toJSON().substr(0, 10));
      }
    });
  }

  writeValue(obj: string): void {
    if (typeof obj === 'string') {
      const m = obj.match(/^(\d{4})-(\d{2})-\d{2}/);
      if (m != null) {
        this.form.get('year').setValue(m[1]);
        this.form.get('month').setValue(m[2]);
      }
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }


}
