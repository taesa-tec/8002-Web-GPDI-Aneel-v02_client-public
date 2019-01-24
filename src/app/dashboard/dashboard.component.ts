import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { UiService } from '@app/shared/ui.service';
import { AuthService } from '@app/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    constructor(protected uiService: UiService, protected authService: AuthService) { }

    logout() {
        this.authService.logout();
    }

    ngOnInit() {

    }

}
