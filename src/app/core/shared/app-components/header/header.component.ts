import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AppService } from '@app/core/services/app.service';
import { AuthService } from '@app/core/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: User;

    constructor(
        protected app: AppService,
        protected auth: AuthService
    ) { }

    get avatar() {
        return (this.currentUser && this.currentUser.fotoPerfil) ?
            `data:image/jpeg;base64,${this.currentUser.fotoPerfil.file}` : '/assets/default_avatar.png';
    }
    get empresa() {
        if (this.currentUser) {
            return this.currentUser.catalogEmpresa ?
                this.currentUser.catalogEmpresa.nome :
                (this.currentUser.razaoSocial ? this.currentUser.razaoSocial : '')
        }
        return '';
    }

    logout() {
        this.auth.logout();
    }

    ngOnInit() {
        this.app.users.currentUserUpdated.subscribe(user => {
            this.currentUser = user;
        });
    }

}
