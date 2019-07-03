import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Empresa, ResultadoResponse, User, AppValidators} from '@app/models';
import {Observable, Observer} from 'rxjs';
import {ActivatedRouteSnapshot, ActivatedRoute, Router} from '@angular/router';
import {AppService} from '@app/core/services/app.service';


@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    form: FormGroup;

    empresas: Observable<Array<Empresa>>;

    resultado: ResultadoResponse;

    user: User;

    constructor(protected app: AppService, protected route: ActivatedRoute) {
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    ngOnInit() {
        this.getUser();
    }

    protected getUser() {
        this.loading.show();
        this.app.users.byId(this.route.snapshot.params.id).subscribe(user => {
            this.user = user;
            this.loading.hide();
        });
    }

    submit(value: any) {
        return this.app.users.edit(value);
    }

    onSubmited(value: ResultadoResponse) {

        try {
            if (value.sucesso) {
                this.app.router.navigate(['/dashboard', 'gerenciar-usuarios'], {
                    queryParams: {
                        message: 'user-updated'
                    }
                });
            }
        } catch (e) {

        }

    }
}
