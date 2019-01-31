import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { Empresa, ResultadoResponse } from '@app/models';
import { UsersService } from '../users.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    constructor(
        protected catalog: CatalogsService,
        protected usersService: UsersService,
        protected router: Router
    ) { }

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    form: FormGroup;

    empresas: Observable<Array<Empresa>>;

    resultado: ResultadoResponse;

    get empresaControl(): FormControl {
        return this.form.get('empresa') as FormControl;
    }

    ngOnInit() {
        this.empresas = this.catalog.empresas();
        const seed = String(Math.random() * 10e16);
        this.form = new FormGroup({
            nomeCompleto: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.email]),
            // cpf: new FormControl('', [Validators.required]),
            status: new FormControl('ativo', [Validators.required]),
            role: new FormControl('Padrao', [Validators.required]),
            // empresa: new FormControl('', [Validators.required]),
            password: new FormControl(
                btoa(seed)
                    .replace(/[^A-Za-z0-9]/g, '#')
                    .concat('@', seed)
            )
        });


        /*
        this.empresaControl.valueChanges.subscribe(value => {
            if (value === 'outra') {
                this.form.addControl('empresaOutro', new FormControl('', [Validators.required]));
            } else {
                this.form.removeControl('empresaOutro');
            }
            this.form.updateValueAndValidity();
        });

        this.catalog.empresas().subscribe(empresas => {
            this.empresas = empresas;
        });
        this.catalog.permissoes().subscribe(permissoes => {
            console.log(permissoes);
        });
        */

    }

    onSubmit() {
        if (this.form.valid) {
            this.loading.show();
            this.usersService.create(this.form.value).subscribe(resultado => {
                this.loading.hide();
                this.resultado = resultado;
                if (resultado.sucesso) {
                    this.router.navigate(['/dashboard', 'gerenciar-usuarios'], {
                        queryParams: {
                            message: 'user-created'
                        }
                    });
                }
            });
        }
    }

}
