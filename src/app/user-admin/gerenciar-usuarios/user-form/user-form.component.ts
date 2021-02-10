import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppValidators, Empresa, ResultadoResponse, Roles, User} from '@app/commons';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {UsersService} from '@app/services/users.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  empresas: Array<Empresa>;
  roles = Roles;
  user: User;
  razaoSocialControl = this.fb.control('');
  empresaIdControl = this.fb.control('', [Validators.required]);
  fotoPerfil: FormGroup = this.fb.group({file: this.fb.control('')});
  form: FormGroup = this.fb.group({
    id: [''],
    email: ['', [Validators.required, Validators.email]],
    nomeCompleto: ['', Validators.required],
    cargo: ['',],
    cpf: ['', [Validators.required, AppValidators.cpf]],
    status: [true, Validators.required],
    role: ['', Validators.required],
    empresaId: this.empresaIdControl,
    razaoSocial: this.razaoSocialControl
  });

  constructor(protected app: AppService, protected usersService: UsersService, protected route: ActivatedRoute, protected fb: FormBuilder) {
  }

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.empresas = data.empresas;
      if (data.user) {
        this.user = data.user;
        this.user.empresaId = this.user.empresaId || '0';
        this.form.patchValue(this.user);
      }
    });

    this.empresaIdControl.valueChanges.subscribe(id => {
      if (id === '0') {
        this.razaoSocialControl.setValidators(Validators.required);
      } else {
        this.razaoSocialControl.reset('');
        this.razaoSocialControl.clearValidators();
      }
      this.form.updateValueAndValidity();
    });
  }

  async submit() {

    if (this.form.valid) {
      try {
        await this.usersService.salvar(this.form.value);
        if (this.fotoPerfil.value.file) {
          await this.usersService.updateAvatar(this.fotoPerfil.value.file);
        }
        await this.app.alert('Usuário salvo com sucesso');
        await this.app.router.navigate(['/admin/gerenciar-usuarios/']);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async removeUser() {
    if (this.user && await this.app.confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        await this.usersService.excluir(this.user.id);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async onSubmited(value: ResultadoResponse) {

    try {
      if (value.sucesso) {
        await this.app.router.navigate(['/admin', 'gerenciar-usuarios'], {
          queryParams: {
            message: 'user-gestor-updated'
          }
        });
      }
    } catch (e) {
      console.error(e);
    }

  }
}
