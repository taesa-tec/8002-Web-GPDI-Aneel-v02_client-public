import {Component, OnInit, Input, ViewContainerRef, ViewChild, ContentChild} from '@angular/core';
import messages from '@app/messages/tooltips.messages';

@Component({
    selector: 'app-tip',
    template: `
        <span
                [ngbTooltip]="message"
                [placement]="placement"
                [hidden]="message.length === 0"><i class="ta-question-o text-dark"></i>
            <ng-content></ng-content>
        </span>`,
    styles: [
        'i{font-size:80%}'
    ]
})
export class TipComponent implements OnInit {

    protected _message = '';
    @Input('tipId') tooltipId: number;
    @Input() placement: any = 'top';

    @Input() set message(value) {
        this._message = value;
    }

    get message() {
        return this._message;
    }

    constructor() {
    }

    ngOnInit() {
        if (messages[this.tooltipId]) {
            this.message = messages[this.tooltipId];
        }
    }

}
