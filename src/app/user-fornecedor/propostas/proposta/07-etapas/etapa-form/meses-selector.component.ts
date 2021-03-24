import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-proposta-meses-selector',
  templateUrl: './meses-selector.component.html',
  styleUrls: ['./meses-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MesesSelectorComponent),
      multi: true
    }
  ]
})
export class MesesSelectorComponent implements OnInit, ControlValueAccessor {
  private _duracao: number;
  get duracao(): number {
    return this._duracao;
  }

  @Input() label = 'Mês #';

  @Input() set duracao(value: number) {
    this._duracao = value;
  }

  map = new Map();

  get meses() {
    return [...this.map].filter(i => i[1] && i[0] <= this.duracao).map(i => i[0]);
  }

  protected onChange: any = function () {  };

  protected onTouch: any = function () {  };

  constructor() {
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  writeValue(obj: Array<number>): void {
    obj.filter(i => i <= this.duracao).forEach(i => this.map.set(i, true));
  }

  change(mes, active) {
    this.map.set(mes, active);
    this.onChange(this.meses);
  }

  ngOnInit(): void {
    this.setup();
  }

  protected setup() {
    (new Array(this.duracao)).fill(false).forEach((m, i) => this.map.set(i + 1, false));
  }

}


export function mesesSelectorRequered(control: AbstractControl): ValidationErrors | null {
  if (Array.isArray(control.value) && control.value.length === 0) {
    return {mesesSelector: true};
  }
  return null;
}
