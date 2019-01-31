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

    orderByField: "nomeCompleto" | "catalogEmpresa.nome" | "status" | "dataCadastro" = "nomeCompleto";
    orderByDirection: "asc" | "desc" = "asc";

    constructor(protected usersService: UsersService, protected catalog: CatalogsService) { }

    order(field: "nomeCompleto" | "catalogEmpresa.nome" | "status" | "dataCadastro", dir: "asc" | "desc" = "asc") {
        this.orderByField = field;
        this.orderByDirection = dir;
    }

    ngOnInit() {

    }

}
