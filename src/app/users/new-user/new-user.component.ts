import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CatalogsService} from '@app/catalogs/catalogs.service';
import {Empresa, ResultadoResponse, UserRole, Roles, AppValidators, User} from '@app/models';
import {UsersService} from '../users.service';
import {LoadingComponent} from '@app/shared/loading/loading.component';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppService} from '@app/app.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html'
})
export class NewUserComponent implements OnInit {

    constructor(
        protected app: AppService,
        protected router: Router
    ) {
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    form: FormGroup;
    roles = Roles;
    empresas: Observable<Array<Empresa>>;
    resultado: ResultadoResponse;

    user: User = {
        nomeCompleto: '',
        email: '',
        cpf: '',
        status: 1,
        role: UserRole.User,
        catalogEmpresaId: '',
        fotoPerfil: null,
        razaoSocial: ''
    };

    ngOnInit() {

    }

    submit(value: any) {
        return this.app.users.create(value);
    }

    onSubmited(value: ResultadoResponse) {

        try {
            if (value.sucesso) {
                this.router.navigate(['/dashboard', 'gerenciar-usuarios'], {
                    queryParams: {
                        message: 'user-created'
                    }
                });
            }
        } catch (e) {

        }

    }
}
