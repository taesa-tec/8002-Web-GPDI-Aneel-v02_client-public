import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { UsersService } from '../users.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Empresa, ResultadoResponse, User } from '@app/models';
import { Observable, Observer } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';



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

    inconsistencias: Observable<Array<string>>;

    inconsistenciasObserver: Observer<Array<string>>;


    constructor(
        protected catalog: CatalogsService,
        protected usersService: UsersService,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        this.inconsistencias = new Observable<Array<string>>(observer => { this.inconsistenciasObserver = observer; });
    }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    ngOnInit() {
        
        this.getUser();
        this.empresas = this.catalog.empresas();
    }
    protected getUser() {
        this.loading.show();
        this.usersService.byId(this.route.snapshot.params.id).subscribe(user => { this.user = user; this.fillForm(); });
    }
    protected fillForm() {

        const u = this.user;

        this.form = new FormGroup({
            id: new FormControl(u.id),
            empresa: new FormControl(''),
            nomeCompleto: new FormControl(u.nomeCompleto, [Validators.required]),
            email: new FormControl(u.email, [Validators.email]),
            cpf: new FormControl(u.cpf, [Validators.required]),
            status: new FormControl(u.status, [Validators.required]),
            role: new FormControl('Padrao', [Validators.required]),
            catalogEmpresaId: new FormControl(u.catalogEmpresaId || '', [Validators.required]),
        });

        this.loading.hide();
    }

    onSubmit() {
        this.loading.show();
        this.inconsistenciasObserver.next([]);
        this.usersService.edit(this.form.value).subscribe(r => {
            this.loading.hide();
            if (r.sucesso) {
                this.router.navigate(['/dashboard', 'gerenciar-usuarios'], {
                    queryParams: {
                        message: 'user-updated'
                    }
                });
            } else {
                this.inconsistenciasObserver.next(r.inconsistencias);
            }
        });
    }
}
