import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    message: string;
    title: string;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }
    
    setMessage(message: string | Array<string>) {
        const messageMerge = message instanceof Array ? message.join('<br>') : message;
        this.message = messageMerge;
    }

}
