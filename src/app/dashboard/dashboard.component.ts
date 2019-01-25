import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingComponent } from '@app/shared/loading/loading.component';
import { UiService } from '@app/shared/ui.service';
import { AuthService } from '@app/auth/auth.service';
import { UsersService } from '@app/users.service';
import { CatalogoService } from '@app/catalogo.service';
import { CurrentUser, Projeto } from '@app/models';
import { ProjetosService } from '@app/projetos.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    currentUser: CurrentUser;
    
    

    constructor(
        protected users: UsersService,
        protected catalogo: CatalogoService,
        protected uiService: UiService,
        protected projetos: ProjetosService,
        protected auth: AuthService) { }

    logout() {
        this.auth.logout();
    }

    ngOnInit() {
        this.users.me().subscribe(currentUser => {
            this.currentUser = currentUser;
        });
        

    }

}
