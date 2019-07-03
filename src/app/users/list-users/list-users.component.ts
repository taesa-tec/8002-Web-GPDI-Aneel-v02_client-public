import {Component, OnInit, Input} from '@angular/core';
import {UsersService} from '@app/core/services/users.service';
import {User} from '@app/models';
import {CatalogsService} from '@app/core/services/catalogs.service';
import {environment} from '@env/environment';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

    @Input() users: Array<User>;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nomeCompleto',
        direction: 'asc'
    };

    constructor(protected usersService: UsersService, protected catalog: CatalogsService) {
    }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

    userAvatar(user: User) {
        return `url(${environment.api_url}/Users/${user.id}/avatar)`;
    }

    ngOnInit() {

    }

}
