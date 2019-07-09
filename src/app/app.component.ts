import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, ActivationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AppService} from '@app/core/services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    version = '';

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) {

        this.version = app.config.version;

    }

    async ngOnInit() {
        this.loading.show();
        this.app.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
            this.loading.show();
        });
        this.app.router.events.pipe(filter(e => (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError))).subscribe(e => {
            this.loading.hide();
        });

        if (this.app.auth.isLoggedIn) {
            // await this.app.users.setCurrentUser();
        }
        this.loading.hide();
    }
}
