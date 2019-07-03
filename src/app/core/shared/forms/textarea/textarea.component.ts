import { Component, Input, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-textarea',
    template: `
    <div>
        <textarea [class]="className" 
        [maxlength]="maxlength" 
        [name]="name" 
        [placeholder]="placeholder" 
        [cols]="cols" 
        [id]="id" 
        [rows]="rows" 
        [disabled]="disabled" 
        [(ngModel)]="value"></textarea>
        <div *ngIf="maxlength > 0" class="text-right fs-12 font-italic p-1">{{charsLeft}} caracteres sobrando</div>
    </div>
  `,
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ],
})
export class TextareaComponent implements ControlValueAccessor {

    @Input() name = '';
    @Input() placeholder = '';
    @Input() cols = 30;
    @Input() rows = 10;
    @Input('form-id') id;
    @Input('class') className = '';
    @Input() disabled;
    @Input() maxlength: number;
    @Input('value') val = '';

    get value() {
        return this.val;
    }

    set value(val) {
        this.val = val;
        this.onChange(val);
        this.onTouched();
    }

    get charsLeft() {
        if (this.maxlength) {
            return this.maxlength - this.value.length;
        }
        return 0;
    }

    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.className = '';
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: any) {
        if (value) {
            this.value = value;
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    setDisabledState(state: boolean) {
        this.disabled = state;
    }
}
