import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { Observable } from 'rxjs';

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

    constructor(protected usersService: UsersService, protected catalog: CatalogsService) { }

    order(data: { field: string; direction: 'asc' | 'desc'; }) {
        this.listOrder = data;
    }

    userAvatar(user: User) {
        if (user.fotoPerfil) {
            return `url(data:image/jpeg;base64,${user.fotoPerfil.file})`;
        }
        return '#CCC';
    }

    ngOnInit() {

    }

}
