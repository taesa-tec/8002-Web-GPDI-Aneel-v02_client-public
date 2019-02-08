import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import {
  Empresa, ResultadoResponse, UserRole, Roles, AppValidators, User, CreateUserRequest,
  Projeto, Projetos
} from '@app/models';
import { UsersService } from '../users.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { Observable, Observer, zip, of, concat, throwError, timer, empty } from 'rxjs';
import { Router } from '@angular/router';
import { ProjetosService } from '@app/projetos/projetos.service';
import { UserProjetosComponent } from '../user-projetos/user-projetos.component';
import { mergeMap, last } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {






  @ViewChild(LoadingComponent) loading: LoadingComponent;

  @ViewChild(UserProjetosComponent) userProjetos: UserProjetosComponent;

  @Output() submited: EventEmitter<ResultadoResponse> = new EventEmitter<ResultadoResponse>();
  @Input() user: User;
  @Input() handler: (value: any) => Observable<ResultadoResponse>;

  form: FormGroup;
  roles = Roles;
  empresas: Array<Empresa>;
  projetos: Projetos;
  resultado: ResultadoResponse;
  userId: string;



  constructor(
    protected catalog: CatalogsService,
    protected usersService: UsersService,
    protected projetoService: ProjetosService,
    protected router: Router
  ) { }

  get empresaControl(): FormControl {
    return this.form.get('catalogEmpresaId') as FormControl;
  }
  get razaoSocial(): FormControl {
    return this.form.get('razaoSocial') as FormControl;
  }



  ngOnInit() {

    const empresas$ = this.catalog.empresas();

    zip(empresas$).subscribe(([empresas]) => {
      this.empresas = empresas;

      const u = this.user;

      this.userId = u.id;

      this.form = new FormGroup({
        nomeCompleto: new FormControl(u.nomeCompleto, [Validators.required]),
        email: new FormControl(u.email, [Validators.email, Validators.required]),
        cpf: new FormControl(u.cpf, [Validators.required, AppValidators.cpf]),
        status: new FormControl(u.status, [Validators.required]),
        role: new FormControl(u.role, [Validators.required]),
        catalogEmpresaId: new FormControl(u.catalogEmpresaId || (u.razaoSocial ? '0' : ''), [Validators.required]),
        fotoPerfil: new FormControl(u.fotoPerfil),
      });

      if (u.id) {
        this.form.addControl('id', new FormControl(u.id));
      }
      if (u.catalogEmpresaId === null) {
        this.form.addControl('razaoSocial', new FormControl(u.razaoSocial, [Validators.required]));
      }

      this.empresaControl.valueChanges.subscribe(r => {
        if (r === "0") {
          this.form.addControl('razaoSocial', new FormControl(u.razaoSocial, [Validators.required]));
        } else {
          this.form.removeControl('razaoSocial');
        }

        this.form.updateValueAndValidity();

      });
    });



  }

  onSubmit() {
    if (this.form.valid && this.handler) {
      this.loading.show();

      try {
        if (this.form.value.catalogEmpresaId === "0") {
          this.form.value.catalogEmpresaId = null;
        }

        const requests = concat(this.handler(this.form.value).pipe(mergeMap(result => {

          console.log(result);

          if (result.sucesso) {

            if (result.id) {
              return this.userProjetos.updatePermissoes(result.id);
            }
            return of(result);
          }
          return throwError(result);

        })), this.userId ? this.userProjetos.updatePermissoes(this.userId) : empty())
          .pipe(last());



        //this.handler(this.form.value)

        requests.subscribe(result => {
          console.log(result);
          this.loading.hide();
          this.submited.emit(result);
          this.resultado = result;
        },
          error => {

            console.log(error);

            const r = {
              acao: "",
              sucesso: false,
              inconsistencias: [error.message]
            };
            this.submited.emit(r);
            this.resultado = r;
            this.loading.hide();
          }
        );

      } catch (error) {
        this.loading.hide();
      }
    }
  }

}
