import { Component, OnInit, Input } from '@angular/core';
import { Projetos, User, Permissao, Projeto, ResultadoResponse, UserRole } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { UsersService } from '../users.service';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Router } from '@angular/router';
import { zip, from, Observable } from 'rxjs';
import { keyBy, mapValues } from 'lodash-es';
import { FormGroup, FormControl } from '@angular/forms';
import { concatAll } from 'rxjs/operators';
import { AppService } from '@app/app.service';

@Component({
    selector: 'app-user-projetos',
    templateUrl: './user-projetos.component.html',
    styleUrls: ['./user-projetos.component.scss']
})
export class UserProjetosComponent implements OnInit {

    projetos: Array<{ projeto: Projeto, form: FormGroup }>;

    permissoes: Array<Permissao>;

    protected _user: User;

    userIdControl = new FormControl('');

    @Input('readonly') _readonly = false;



    @Input() set user(value) {
        this._user = value;
        this.userId = value.id;
    }
    set userId(value) {
        this.userIdControl.setValue(value);
    }

    constructor(
        protected app: AppService,
        protected router: Router) { }

    get userId() {
        return this.userIdControl.value;
    }

    get isUserAdmin() {
        return this._user.role === UserRole.Administrador;
    }

    ngOnInit() {

        const projetos$ = this.app.projetos.getProjetos();
        const userProjetos$ = this.app.users.userProjetos(this.userId);
        const permissoes$ = this.app.catalogo.permissoes();

        zip(projetos$, userProjetos$, permissoes$).subscribe(([projetos, userProjetos, permissoes]) => {

            this.permissoes = permissoes;
            const adminPermission = this.permissoes.find(p => p.valor === 'admin');
            const permissoesAtuais = mapValues(keyBy(userProjetos, 'projetoId'), 'catalogUserPermissaoId');

            this.projetos = projetos.map(p => {
                return {
                    projeto: p,
                    form: new FormGroup({
                        userId: new FormControl(this.userId),
                        projetoId: new FormControl(p.id),
                        CatalogUserPermissaoId: new FormControl({
                            value: this.isUserAdmin ? adminPermission.id : permissoesAtuais[p.id] || '',
                            disabled: this._readonly || this.isUserAdmin
                        })
                    })
                };
            });
        });

    }
    updatePermissoes(userId?: string): Observable<ResultadoResponse> {
        if (userId) {
            this.userId = userId;
        }
        const permissoes = this.projetos.filter(p => p.form.value.CatalogUserPermissaoId !== '').map(p => {
            p.form.get('userId').setValue(this.userId);
            return p.form.value;
        });
        return this.app.users.criarUserProjeto(permissoes);
    }

}
