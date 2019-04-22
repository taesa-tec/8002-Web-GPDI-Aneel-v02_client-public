import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input, Optional,
    Output,
    QueryList, ViewChildren,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {LogItem, TextValue} from '@app/models';
import {LoggerService} from '@app/logger/logger.service';


@Directive({
    selector: '[appLogItem]',
    exportAs: 'logItem'
})
export class LoggerItemDirective implements AfterViewInit {

    @Input('appLogItem') title: string;
    // Se for checkbox ou radio  e queira sobreescreber o valor
    @Input('appLogItemValue') logItemValue: string;
    @Input('formControlName') controlName;

    ngAfterViewInit(): void {
    }

    get changed() {
        return this.control.touched;
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
            if (this.element.nativeElement.tagName === 'INPUT') {
                const el = <HTMLInputElement>this.element.nativeElement;
                switch (el.type) {
                    case 'checkbox':
                    case 'radio':
                        if (!el.checked) {
                            return null;
                        } else if (this.logItemValue) {
                            return this.logItemValue;
                        }
                        break;
                }
            }
            return this.control ? this.control.value : null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    constructor(@Optional() protected control: NgControl, protected element: ElementRef) {
    }

}

@Directive({
    selector: '[appLogger]',
    exportAs: 'logger'
})
export class LoggerDirective implements AfterViewInit {

    @ContentChildren(LoggerItemDirective, {descendants: true}) items: QueryList<LoggerItemDirective>;

    @Input() initLog = true;
    @Input('appLogger') tela;
    @Output() initialLog: EventEmitter<LogItem> = new EventEmitter();

    protected _firstLog: LogItem;

    get firstLog() {
        return this._firstLog;
    }

    constructor(protected logger: LoggerService) {
    }

    ngAfterViewInit(): void {
        if (this.initLog) {
            this._firstLog = this.getLog();
            this.initialLog.emit(this.firstLog);
        }
        this.items.changes.subscribe(changes => { });
        this.items.notifyOnChanges();

    }

    getLog(onlyChanges: boolean = false): LogItem {
        return this.items
            .filter(item => (!onlyChanges || item.changed) && item.value !== null)
            .map(item => {
                return {
                    text: item.title,
                    value: item.value
                };
            });
    }

    save(statusNovo?: LogItem | string, statusAnterior?: LogItem | string, acao?: 'Create' | 'Update' | 'Delete', projetoId?: any, userId?: string) {
        return this.logger.submitLog(statusNovo, statusAnterior, acao, this.tela, projetoId, userId);
    }

    saveChanges(acao?: 'Create' | 'Update' | 'Delete', projetoId?: any, userId?: string) {
        return this.save(this.getLog(), this.firstLog, acao, projetoId, userId);
    }

    saveCreate(projetoId?: any, userId?: string) {
        return this.save(this.getLog(), '', 'Create', projetoId, userId);
    }

    saveUpdate(projetoId?: any, userId?: string) {
        return this.saveChanges('Update', projetoId, userId);
    }

    saveDelete(projetoId?: any, userId?: string) {
        return this.logger.submitLog('Excluído', this.getLog(), 'Delete', projetoId, userId);
    }
}

