import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageAlert, User } from '@app/models';
import { Observable } from 'rxjs';
import { UsersService } from '@app/users/users.service';

const alertMessages: { [propName: string]: MessageAlert } = {
    'user-created': {
        message: "Usuário criado com sucesso. Enviamos um e-mail para ele com instruções de acesso e definição de senha.",
        type: 'success'
    },
    'user-updated': {
        message: "Usuário editado com sucesso. Obrigado.",
        type: 'success'
    }
};


@Component({
    selector: 'app-gerenciar-usuarios',
    templateUrl: './gerenciar-usuarios.component.html',
    styleUrls: ['./gerenciar-usuarios.component.scss']
})
export class GerenciarUsuariosComponent implements OnInit {

    constructor(protected activatedRoute: ActivatedRoute, protected usersService: UsersService) { }

    dashboardAlert: MessageAlert;
    users: Observable<Array<User>> = this.usersService.all();

    ngOnInit() {
        const query = this.activatedRoute.snapshot.queryParams;
        if (query.message && alertMessages[query.message]) {
            this.dashboardAlert = alertMessages[query.message];
        }
    }

}
