import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-status-flow',
    template: `<app-loading type="fullscreen"></app-loading>`,
    styles: []
})
export class StatusFlowComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild(LoadingComponent) loading: LoadingComponent;

    projetoLoaded: Subscription;
    constructor(protected app: AppService, protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        this.projetoLoaded = this.app.projetos.projetoLoaded.subscribe(projeto => {
            const id = projeto.id;
            const status = projeto.catalogStatus.status.toLowerCase();
            timer(10).subscribe(i => {
                this.app.router.navigate([`/dashboard/projeto/${id}/${status}/`]);
            });
        });

    }

    ngOnDestroy() {
        this.projetoLoaded.unsubscribe();
    }

}
