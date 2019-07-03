import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    options: { text: string, value: any, cssClass: string }[];
    title: string;
    message: string;

    constructor(protected activeModal: NgbActiveModal) { }

    setMessage(message: string | Array<string>) {
        const messageMerge = message instanceof Array ? message.join('<br>') : message;
        this.message = messageMerge;
    }
}
