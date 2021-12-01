import {Component, Input} from '@angular/core';
import {UsersService} from '@app/services/users.service';
import {User} from '@app/commons';
import {CatalogsService} from '@app/services/catalogs.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  @Input() users: Array<User>;

  listOrder: { field: string; direction: 'asc' | 'desc' } = {
    field: 'nomeCompleto',
    direction: 'asc'
  };

  constructor(protected usersService: UsersService, protected catalog: CatalogsService) {
  }

  order(data: { field: string; direction: 'asc' | 'desc' }) {
    this.listOrder = data;
  }

  userAvatar(user: User) {
    return user.fotoPerfil ? `url(${user.fotoPerfil})` : '/assets/default_avatar.png';
  }

}
