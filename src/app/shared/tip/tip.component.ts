import { Component, OnInit, Input } from '@angular/core';
import messages from '@app/messages/tooltips.messages';

@Component({
    selector: 'app-tip',
    template: `<span 
    [ngbTooltip]="message" 
    [placement]="placement"
    [hidden]="message.length === 0"><i class="ta-question-o text-dark"></i></span>`,
    styles: [
        'i{font-size:80%}'
    ]
})
export class TipComponent implements OnInit {

    message: string;
    @Input('tipId') tooltipId: number;
    @Input() placement: any = 'top';

    constructor() { }

    ngOnInit() {
        if (messages[this.tooltipId]) {
            this.message = messages[this.tooltipId];
        } else {
            this.message = "";
        }
    }

}
