import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Empresa, ResultadoResponse, Roles, User} from '@app/commons';
import {LoadingComponent} from '@app/core/components';
import {AppService, AuthService, UsersService} from '@app/services';
import {Router} from '@angular/router';
import {environment} from '@env/environment';

@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.scss']
})
export class MeuCadastroComponent implements OnInit {

  form: FormGroup;
  fotoPerfil: FormGroup;
  roles = Roles;
  empresas: Array<Empresa>;
  resultado: ResultadoResponse;

  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  @Output() submited: EventEmitter<ResultadoResponse> = new EventEmitter<ResultadoResponse>();

  user: User;

  constructor(
    protected app: AppService,
    protected auth: AuthService,
    protected usersService: UsersService,
    protected router: Router
  ) {
  }

  get previewAvatar() {
    return this.auth.user.fotoPerfil;
  }

  get empresaControl(): FormControl {
    return this.form.get('empresaId') as FormControl;
  }

  get razaoSocial(): FormControl {
    return this.form.get('razaoSocial') as FormControl;
  }

  async ngOnInit() {
    this.empresas = await this.app.catalogo.empresas();
    this.getCurrentUser();
  }

  getCurrentUser() {
    const u = this.auth.user;
    if (u === null) {
      return;
    }
    this.user = u;
    this.fotoPerfil = new FormGroup({
      file: new FormControl('')
    });

    this.form = new FormGroup({
      nomeCompleto: new FormControl(u.nomeCompleto, [Validators.required]),
      email: new FormControl(u.email, [Validators.email, Validators.required]),
      cpf: new FormControl({value: u.cpf, disabled: true}),
      status: new FormControl({value: u.status, disabled: true}),
      role: new FormControl(u.role),
      empresaId: new FormControl({value: u.empresaId || (u.razaoSocial ? '0' : ''), disabled: false}),
      cargo: new FormControl(u.cargo, Validators.required)
    });

    if (u.id) {
      this.form.addControl('id', new FormControl(u.id));
    }
    if (u.empresaId === null) {
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

  }

  async onSubmit() {

    if (this.form.valid) {
      this.loading.show();
      try {

        if (this.form.value.empresaId === '0') {
          this.form.value.empresaId = null;
        }

        const resultado = await this.usersService.editMe(this.form.value);

        if (this.fotoPerfil.value.file) {
          await this.usersService.updateAvatar(this.fotoPerfil.value.file);
        }
        if (resultado.sucesso) {
          this.app.alert('Suas informações foram atualizadas com sucesso').then();
          this.auth.user.nomeCompleto = this.form.value.nomeCompleto;
          this.auth.user.cargo = this.form.value.cargo;
          // await this.app.users.setCurrentUser();
        } else {
          this.app.alert(resultado.inconsistencias).then();
        }

      } catch (error) {
        console.error(error);
      }
      this.loading.hide();
    }
  }

}
