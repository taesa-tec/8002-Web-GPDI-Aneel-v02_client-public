import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
    selector: 'app-status-flow',
    template: `<app-loading type="fullscreen"></app-loading>`,
    styles: []
})
export class StatusFlowComponent implements OnInit, AfterViewInit {


    @ViewChild(LoadingComponent) loading: LoadingComponent;
    constructor(protected app: AppService, protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            console.log(projeto.catalogStatus.status.toLowerCase());
            const id = projeto.id;
            const status = projeto.catalogStatus.status.toLowerCase();

            timer(10).subscribe(i => {
                this.app.router.navigate([`/dashboard/projeto/${id}/${status}/`]);
            });
        });
    }

}
