import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription, Observable, of} from 'rxjs';
import {Projeto, FileUploaded, User, UserProjeto} from '@app/models';
import {AppService} from '@app/services/app.service';
import {zip} from 'rxjs';
import {FormArray, FormGroup, FormControl} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {SafeUrl} from '@angular/platform-browser';
import {map, catchError} from 'rxjs/operators';
import {isNil, keyBy} from 'lodash-es';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: []
})
export class UsuariosComponent implements OnInit {

    permissoes: Array<any>;
    projeto: Projeto;
    users: Array<User>;

    // usersProjeto: Array<UserProjeto> = [];
    usersPermissao: Array<{ user: User, formGroup: FormGroup }>;


    formArray: FormArray;
    formUsersSelecteds = new FormGroup({});
    selectAll: FormControl = new FormControl('');
    globalcatalogUserPermissaoId: FormControl = new FormControl('');

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'created',
        direction: 'asc'
    };

    avatars: { [propName: string]: Observable<SafeUrl> } = {};


    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild('saving') loadingSaving: LoadingComponent;

    constructor(protected app: AppService) {
    }

    get selectedUsers() {
        if (this.users) {
            return this.users.filter(user => {
                const c = this.formUsersSelecteds.get(user.id);
                return !isNil(c) && c.value;
            }).map(user => user.id);
        }
        return [];
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        this.loadUsers();
    }

    getAvatar(user) {
        if (this.avatars[user.id] === undefined) {
            this.avatars[user.id] = this.app.file.toBlob(`Users/${user.id}/avatar`, user.id).pipe(catchError(err => {
                return of('/assets/avatartaesa.png');
            }));
        }
    }

    loadUsers() {
        const permissoes$ = this.app.catalogo.permissoes();
        const empresas$ = this.app.catalogo.empresas();
        const users$ = this.app.users.all();


        this.loading.show();

        zip(empresas$, permissoes$, users$).subscribe(([empresas, permissoes, users]) => {
            this.permissoes = permissoes;
            this.users = users;
            this.users.forEach(user => this.getAvatar(user));
            this.app.projetos.usersProjeto(this.projeto.id).subscribe(result => {
                const ups = result.map(userProjeto => {
                    if (userProjeto.applicationUser.catalogEmpresaId) {
                        userProjeto.applicationUser.catalogEmpresa = empresas.find(e => e.id === userProjeto.applicationUser.catalogEmpresaId);
                    }
                    return userProjeto;
                });

                this.formArray = new FormArray([]);

                this.usersPermissao = this.users.map(user => {
                    const item = ups.find(up => up.userId === user.id) ||
                        {id: 0, userId: user.id, projetoId: this.projeto.id, catalogUserPermissaoId: '', applicationUser: user};

                    const formGroup = new FormGroup({
                        userId: new FormControl(user.id),
                        projetoId: new FormControl(this.projeto.id),
                        catalogUserPermissaoId: new FormControl(item.catalogUserPermissaoId)
                    });
                    this.formUsersSelecteds.addControl(user.id, new FormControl(false));
                    // if (user.id === this.app.users.currentUser.id) {
                    //     this.formUsersSelecteds.addControl(user.id, new FormControl({ value: false, disabled: true }));
                    // } else {
                    //     this.formUsersSelecteds.addControl(user.id, new FormControl(false));
                    // }
                    this.formArray.push(formGroup);

                    return {user, formGroup};
                });

                this.selectAll.valueChanges.subscribe(value => {
                    this.users.forEach(user => {
                        if (user.id !== this.app.users.currentUser.id) {
                            this.formUsersSelecteds.controls[user.id].setValue(value);
                        }
                    });
                });

                this.loading.hide();
            });
        });
    }

    save() {
        const formData = (this.formArray.value as Array<any>).filter(d => d.catalogUserPermissaoId !== '');
        this.loadingSaving.show();
        if (this.formArray.length === 0) {
            this.app.alert('Não é possivel salvar');
        } else {

            this.app.projetos.projetoUsers(formData).subscribe(result => {
                this.loadingSaving.hide();
                if (result.sucesso) {
                    this.app.alert('Alterações salvas com sucesso!');
                } else {
                    this.app.alert(result.inconsistencias);
                }
            });
        }
    }

    aplicarPermissoes() {
        const forms = keyBy(this.usersPermissao, 'user.id');


        this.selectedUsers.forEach(userid => {
            if (forms[userid] && userid !== this.app.users.currentUser.id) {
                forms[userid].formGroup.get('catalogUserPermissaoId').setValue(this.globalcatalogUserPermissaoId.value);
            }

        });
        this.formArray.updateValueAndValidity();
    }

}
