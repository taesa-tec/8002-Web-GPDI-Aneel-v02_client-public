import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SafeHtml} from '@angular/platform-browser';
import htmlpages from '@htmlpages/index';

@Component({
    selector: 'app-modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent implements OnInit {

    protected htmlContent: SafeHtml;

    constructor(public activeModal: NgbActiveModal) {
    }

    setPage(page: string) {
        if (htmlpages[page]) {
            this.htmlContent = htmlpages[page];
        } else {
            throw new Error('Página não encontrada');
        }
    }

    ngOnInit() {
    }

}
