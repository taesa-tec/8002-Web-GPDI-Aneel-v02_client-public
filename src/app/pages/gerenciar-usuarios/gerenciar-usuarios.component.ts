import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessageAlert, User} from '@app/commons';
import {UsersService} from '@app/services';
import {LoadingComponent} from '@app/core/components';


const alertMessages: { [propName: string]: MessageAlert } = {
  'user-created': {
    message: 'Usuário criado com sucesso. Enviamos um e-mail para ele com instruções de acesso e definição de senha.',
    type: 'success'
  },
  'user-updated': {
    message: 'Usuário editado com sucesso. Obrigado.',
    type: 'success'
  },
  'user-removed': {
    message: 'Usuário removido',
    type: 'success'
  }
};


@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: []
})
export class GerenciarUsuariosComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  constructor(protected activatedRoute: ActivatedRoute, protected usersService: UsersService) {
  }

  dashboardAlert: MessageAlert;
  _users: Array<User> = [];
  ativos = true;

  get users(): Array<User> {
    return this._users.filter(u => u.status === this.ativos);
  }

  async ngOnInit() {
    this.loading.show();
    this._users = await this.usersService.all();
    this.loading.hide();

    const query = this.activatedRoute.snapshot.queryParams;
    if (query.message && alertMessages[query.message]) {
      this.dashboardAlert = alertMessages[query.message];
    }

    this.activatedRoute.fragment.subscribe(f => {
      this.ativos = f !== 'inativo';
    });
  }

}
