import {Component, ViewChild} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, ActivationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LoadingComponent} from './shared/loading/loading.component';
import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    version = '';

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) {

        this.version = app.config.version;
        this.app.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
            this.loading.show();
        });
        this.app.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
            this.loading.hide();
        });
        if (this.app.auth.isLoggedIn) {
            this.app.users.me(true);
        }
    }
}
