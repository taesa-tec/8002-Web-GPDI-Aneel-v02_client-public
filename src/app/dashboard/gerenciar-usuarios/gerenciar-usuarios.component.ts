import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessageAlert, User} from '@app/models';
import {Observable} from 'rxjs';
import {UsersService} from '@app/users/users.service';
import {LoadingComponent} from '@app/shared/loading/loading.component';

const alertMessages: { [propName: string]: MessageAlert } = {
    'user-created': {
        message: 'Usuário criado com sucesso. Enviamos um e-mail para ele com instruções de acesso e definição de senha.',
        type: 'success'
    },
    'user-updated': {
        message: 'Usuário editado com sucesso. Obrigado.',
        type: 'success'
    }
};


@Component({
    selector: 'app-gerenciar-usuarios',
    templateUrl: './gerenciar-usuarios.component.html',
    styleUrls: []
})
export class GerenciarUsuariosComponent implements OnInit {

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected activatedRoute: ActivatedRoute, protected usersService: UsersService) {
    }

    dashboardAlert: MessageAlert;
    _users: Array<User> = [];
    ativos = true;

    get users(): Array<User> {
        return this._users.filter(u => u.status === (this.ativos ? 1 : 0));
    }

    ngOnInit() {
        this.loading.show();

        this.usersService.all().subscribe(users => {
            this._users = users;
            setTimeout(() => {
                this.loading.hide();
            }, 300);
        });

        const query = this.activatedRoute.snapshot.queryParams;
        if (query.message && alertMessages[query.message]) {
            this.dashboardAlert = alertMessages[query.message];
        }
    }

}
