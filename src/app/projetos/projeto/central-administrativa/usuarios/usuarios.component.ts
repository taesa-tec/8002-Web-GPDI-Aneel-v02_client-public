import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Projeto, FileUploaded, User, UserProjeto } from '@app/models';
import { AppService } from '@app/app.service';
import { zip } from 'rxjs';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: []
})
export class UsuariosComponent implements OnInit {

    permissoes: Array<any>;
    projetoLoaded: Subscription;
    projeto: Projeto;
    users: Array<User>;

    // usersProjeto: Array<UserProjeto> = [];
    usersPermissao: Array<{ user: User, formGroup: FormGroup }>;


    formArray: FormArray;

    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'created',
        direction: 'asc'
    };


    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) { }

    ngOnInit() {

        this.projetoLoaded = this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.loadUsers();
        });
    }
    loadUsers() {
        const permissoes$ = this.app.catalogo.permissoes();
        const empresas$ = this.app.catalogo.empresas();
        const users$ = this.app.users.all();

        this.loading.show();

        zip(empresas$, permissoes$, users$).subscribe(([empresas, permissoes, users]) => {
            this.permissoes = permissoes;
            this.users = users;
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
                        { id: 0, userId: user.id, projetoId: this.projeto.id, catalogUserPermissaoId: '', applicationUser: user };
                    const formGroup = new FormGroup({
                        userId: new FormControl(user.id),
                        projetoId: new FormControl(this.projeto.id),
                        catalogUserPermissaoId: new FormControl(item.catalogUserPermissaoId)
                    })
                    this.formArray.push(formGroup);

                    return { user, formGroup }
                });

                this.loading.hide();
            });
        });
    }

}
