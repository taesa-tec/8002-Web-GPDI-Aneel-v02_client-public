import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {MultiSelectOptionComponent} from "./multi-select-option/multi-select-option.component";

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ],
})
export class MultiSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {


  // tslint:disable-next-line:ban-types variable-name
  protected _onChange: Function;
  // tslint:disable-next-line:ban-types variable-name
  protected _onTouch: Function;
  @Input() placeholder;
  @Input() min = 1;


  values: Array<any>;

  options: Array<{ value: any, label: string }> = [];
  // tslint:disable-next-line:variable-name
  @ContentChildren(MultiSelectOptionComponent) _options!: QueryList<MultiSelectOptionComponent>;

  selects = this.fb.array([]);
  form = this.fb.group({
    selects: this.selects
  });

  trkOpt = (i, o) => o.value;

  constructor(protected fb: FormBuilder) {
  }

  addSelect(value: any) {
    this.selects.push(this.fb.control(value));
  }

  removeSelect(at) {
    this.selects.removeAt(at);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(obj: any): void {
    this.values = obj;
    this.selects.clear();
    if (this.values.length > 0)
      this.values.forEach(value => this.addSelect(value));
    else
      this.addSelect('');
  }


  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      if (this._onChange)
        this._onChange(value.selects);
    });
  }

  ngAfterContentInit() {
    this.updateOptions();
    this._options.changes.subscribe(changes => {
      this.updateOptions();
    });
  }

  protected updateOptions() {
    this.options = this._options.map(o => ({value: o.value, label: o.label}));
  }

}
