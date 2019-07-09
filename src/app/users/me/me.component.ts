import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {User, Roles, Empresa, ResultadoResponse, Projetos, AppValidators} from '@app/models';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {Router} from '@angular/router';
import {AppService} from '@app/core/services/app.service';

@Component({
    selector: 'app-edit-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

    form: FormGroup;
    fotoPerfil: FormGroup;
    roles = Roles;
    empresas: Array<Empresa>;
    resultado: ResultadoResponse;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    @Output() submited: EventEmitter<ResultadoResponse> = new EventEmitter<ResultadoResponse>();

    user: User;

    projetos: Projetos;

    constructor(
        protected app: AppService,
        protected router: Router
    ) {
    }

    get empresaControl(): FormControl {
        return this.form.get('catalogEmpresaId') as FormControl;
    }

    get razaoSocial(): FormControl {
        return this.form.get('razaoSocial') as FormControl;
    }

    ngOnInit() {
        this.app.catalogo.empresas().subscribe(e => {
            this.empresas = e;
            this.getCurrentUser();
        });

    }

    getCurrentUser() {
        this.app.users.currentUserUpdated.subscribe(u => {
            if (u === null) {
                return;
            }
            this.user = u;
            this.fotoPerfil = new FormGroup({
                file: new FormControl(u.fotoPerfil ? u.fotoPerfil.file : '')
            });

            this.form = new FormGroup({
                nomeCompleto: new FormControl(u.nomeCompleto, [Validators.required]),
                email: new FormControl(u.email, [Validators.email, Validators.required]),
                cpf: new FormControl({value: u.cpf, disabled: true}),
                status: new FormControl({value: u.status, disabled: true}),
                role: new FormControl(u.role),
                catalogEmpresaId: new FormControl({value: u.catalogEmpresaId || (u.razaoSocial ? '0' : ''), disabled: false}),
                fotoPerfil: this.fotoPerfil
            });

            if (u.id) {
                this.form.addControl('id', new FormControl(u.id));
            }
            if (u.catalogEmpresaId === null) {
                this.form.addControl('razaoSocial', new FormControl(u.razaoSocial, [Validators.required]));
            }
            this.empresaControl.valueChanges.subscribe(r => {
                if (r === '0') {
                    this.form.addControl('razaoSocial', new FormControl(u.razaoSocial, [Validators.required]));
                } else {
                    this.form.removeControl('razaoSocial');
                }
                this.form.updateValueAndValidity();

            });

        });
    }

    onSubmit() {

        if (this.form.valid) {
            this.loading.show();
            try {

                if (this.form.value.catalogEmpresaId === '0') {
                    this.form.value.catalogEmpresaId = null;
                }

                this.app.users.editMe(this.form.value).subscribe(async resultado => {
                    this.loading.hide();
                    if (resultado.sucesso) {
                        this.app.alert('Suas informações foram atualizadas com sucesso');
                        await this.app.users.setCurrentUser();
                    } else {
                        this.app.alert(resultado.inconsistencias);
                    }
                });

            } catch (error) {
                console.error(error);
                this.loading.hide();
            }
        }
    }

}
