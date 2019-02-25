import { Component, Input, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';


@Component({
    selector: 'app-checkbox',
    template: `<div [class]="className" [ngClass]="inputClass" [id]="id">
    <input 
    type="checkbox" 
    [disabled]="disabled" 
    [(ngModel)]="value" /></div>`,
    styles: [
        ':host, :host > div{display:inline;position:relative}',
        ':host input{position:absolute; width:1px; height:1px; opacity:0;}'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ],
})
export class CheckboxComponent implements ControlValueAccessor {

    @Input() name = '';
    @Input('form-id') id;
    @Input('class') className = '';
    @Input() disabled;
    @Input('value') val = false;

    get value() {
        return this.val;
    }

    set value(val) {
        if (!this.disabled) {
            this.val = val;
            this.onChange(val);
            this.onTouched();
        }
    }
    get inputClass() {
        return this.value ? 'ta-checkbox-checked' : 'ta-checkbox-unchecked';
    }

    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.className = '';
        const el = <HTMLDivElement>this.elementRef.nativeElement;
        fromEvent(el, 'click').subscribe(event => this.toggle());
    }
    toggle() {
        if (!this.disabled) {
            this.value = !this.value;
        }
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: boolean) {
        this.value = value;
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    
}
