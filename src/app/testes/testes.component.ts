import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import * as moment from 'moment';

@Component({
    selector: 'app-testes',
    templateUrl: './testes.component.html',
    styleUrls: []
})
export class TestesComponent implements OnInit {

    constructor(protected app: AppService) { }

    ngOnInit() {
    }
    get output() {
        return moment().format('MMMM');
    }

}
