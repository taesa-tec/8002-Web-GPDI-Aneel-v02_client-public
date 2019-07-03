import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'app-prompt',
    templateUrl: './prompt.component.html',
    styles: []
})
export class PromptComponent implements OnInit {

    options: { text: string, value: any, cssClass: string }[];
    title: string;
    message: string;
    form: FormGroup;
    response: FormControl;

    @Input() validators: ValidatorFn | ValidatorFn[] = [];

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
        this.response = new FormControl('', this.validators);
        this.form = new FormGroup({ response: this.response });
    }

    setMessage(message: string | Array<string>) {
        const messageMerge = message instanceof Array ? message.join('<br>') : message;
        this.message = messageMerge;
    }

}
