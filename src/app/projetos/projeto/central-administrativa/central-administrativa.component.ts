import { Component, OnInit, Input } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { filter } from 'lodash-es';

@Component({
    selector: 'app-central-administrativa',
    templateUrl: './central-administrativa.component.html',
    styleUrls: ['./central-administrativa.component.scss']
})
export class CentralAdministrativaComponent implements OnInit {

    routes: Routes;

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe(d => {
            this.routes = filter(d.routes, (r => r.path !== "**" && r.path.length > 0));
        });
    }

    ngOnInit() {
    }

}
