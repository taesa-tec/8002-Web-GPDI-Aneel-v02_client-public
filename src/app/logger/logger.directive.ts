import {
    AfterViewInit,
    Attribute,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    ViewChildren
} from '@angular/core';
import {FormControl, FormControlDirective, FormGroup, NgControl} from '@angular/forms';
import {LogItem, TextValue} from '@app/models';


@Directive({
    selector: '[appLogItem]'
})
export class LoggerItemDirective implements AfterViewInit {

    @Input('appLogItem') title: string;
    @Input('formControlName') controlName;

    ngAfterViewInit(): void {
    }

    get value() {
        try {

            if (this.element.nativeElement.tagName === 'SELECT') {
                const selecteds = [];
                for (let i = 0; i < this.element.nativeElement.selectedOptions.length; i++) {
                    selecteds.push(this.element.nativeElement.selectedOptions.item(i).label);
                }
                return selecteds.join(', ');
            }
            return this.control.value;
        } catch (e) {
            console.error(e);
            return 'Error';
        }
    }

    constructor(protected control: NgControl, protected element: ElementRef) {
    }

}

@Directive({
    selector: '[appLogger]'
})
export class LoggerDirective implements AfterViewInit {
    @ContentChildren(LoggerItemDirective) items: QueryList<LoggerItemDirective>;
    @Input('formGroup') form: FormGroup;
    @Output() initialLog: EventEmitter<LogItem> = new EventEmitter();

    ngAfterViewInit(): void {
        this.initialLog.emit(this.getLog());
    }

    getLog(): LogItem {
        return this.items.map(item => {
            return {
                text: item.title,
                value: item.value
            };
        });
    }

}

