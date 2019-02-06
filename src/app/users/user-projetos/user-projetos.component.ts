import { Component, OnInit, Input } from '@angular/core';
import { Projetos, User, Permissao, Projeto } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { UsersService } from '../users.service';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { keyBy, mapValues } from 'lodash-es';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-projetos',
  templateUrl: './user-projetos.component.html',
  styleUrls: ['./user-projetos.component.scss']
})
export class UserProjetosComponent implements OnInit {

  projetos: Array<{ projeto: Projeto, form: FormGroup }>;

  permissoes: Array<Permissao>;

  @Input() user: User;

  constructor(protected catalog: CatalogsService,
    protected usersService: UsersService,
    protected projetoService: ProjetosService,
    protected router: Router) { }

  ngOnInit() {

    const projetos$ = this.projetoService.getProjetos();
    const userProjetos$ = this.usersService.userProjetos(this.user);
    const permissoes$ = this.catalog.permissoes();

    zip(projetos$, userProjetos$, permissoes$).subscribe(([projetos, userProjetos, permissoes]) => {

      this.permissoes = permissoes;

      // Permissões atuais -> p.id = {userId, projetoId...}
      const permissoesAtuais = mapValues(keyBy(userProjetos, 'projetoId'), 'CatalogUserPermissaoId');

      this.projetos = projetos.map(p => {
        return {
          projeto: p,
          form: new FormGroup({
            userId: new FormControl(this.user.id),
            projetoId: new FormControl(p.id),
            CatalogUserPermissaoId: new FormControl(permissoesAtuais[p.id] || '')
          })
        };
      });
    });

  }

}
