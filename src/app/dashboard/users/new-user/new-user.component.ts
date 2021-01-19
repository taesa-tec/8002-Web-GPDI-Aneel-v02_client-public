import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Empresa, ResultadoResponse, UserRole, Roles, AppValidators, User} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {UsersService} from '@app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})
export class NewUserComponent implements OnInit {

  constructor(
    protected app: AppService,
    protected usersService: UsersService,
    protected router: Router
  ) {
  }

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  form: FormGroup;
  roles = Roles;
  resultado: ResultadoResponse;

  user: User = {
    nomeCompleto: '',
    email: '',
    cpf: '',
    status: true,
    role: UserRole.User,
    empresaId: '',
    fotoPerfil: null,
    razaoSocial: ''
  };

  ngOnInit() {

  }

  async submit(value: any) {
    return await this.usersService.create(value);
  }

  async onSubmited(value: ResultadoResponse) {

    try {
      if (value.sucesso) {
        return this.router.navigate(['/admin', 'gerenciar-usuarios'], {
          queryParams: {
            message: 'user-gestor-created'
          }
        });
      } else {
        await this.app.alert(value.inconsistencias[0], 'Usuário não pode ser criado');
      }
    } catch (e) {

    }

  }
}
