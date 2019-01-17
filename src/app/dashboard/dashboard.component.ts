import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;
    constructor() { }

    ngOnInit() {
        
    }

}
