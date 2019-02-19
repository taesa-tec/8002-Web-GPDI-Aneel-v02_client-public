import { Component, OnInit, Input } from '@angular/core';
import { Projetos, User, Permissao, Projeto, ResultadoResponse } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { UsersService } from '../users.service';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Router } from '@angular/router';
import { zip, from, Observable } from 'rxjs';
import { keyBy, mapValues } from 'lodash-es';
import { FormGroup, FormControl } from '@angular/forms';
import { concatAll } from 'rxjs/operators';

@Component({
    selector: 'app-user-projetos',
    templateUrl: './user-projetos.component.html',
    styleUrls: ['./user-projetos.component.scss']
})
export class UserProjetosComponent implements OnInit {

    projetos: Array<{ projeto: Projeto, form: FormGroup }>;

    permissoes: Array<Permissao>;

    userIdControl = new FormControl('');

    @Input('readonly') _readonly = false;



    @Input() set userId(value) {
        console.log("UserID", value);

        this.userIdControl.setValue(value);
    }

    constructor(protected catalog: CatalogsService,
        protected usersService: UsersService,
        protected projetoService: ProjetosService,
        protected router: Router) { }

    get userId() {
        return this.userIdControl.value;
    }

    ngOnInit() {

        const projetos$ = this.projetoService.getProjetos();
        const userProjetos$ = this.usersService.userProjetos(this.userId);
        const permissoes$ = this.catalog.permissoes();

        zip(projetos$, userProjetos$, permissoes$).subscribe(([projetos, userProjetos, permissoes]) => {

            this.permissoes = permissoes;
            const permissoesAtuais = mapValues(keyBy(userProjetos, 'projetoId'), 'catalogUserPermissaoId');

            this.projetos = projetos.map(p => {
                return {
                    projeto: p,
                    form: new FormGroup({
                        userId: new FormControl(this.userId),
                        projetoId: new FormControl(p.id),
                        CatalogUserPermissaoId: new FormControl({
                            value: permissoesAtuais[p.id] || '',
                            disabled: this._readonly
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
        console.log({ permissoes });

        return this.usersService.criarUserProjeto(permissoes);
    }

}
