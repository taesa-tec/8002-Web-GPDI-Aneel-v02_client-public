import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppValidators, Empresa, ResultadoResponse, Roles, User} from '@app/commons';
import {LoadingComponent} from '@app/core/components';
import {AppService, AuthService, UsersService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.scss']
})
export class MeuCadastroComponent implements OnInit {
  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;
  @Output() submited: EventEmitter<ResultadoResponse> = new EventEmitter<ResultadoResponse>();

  protected shouldRemoveAvatar = false;
  fotoPerfil: FormGroup;
  roles = Roles;
  empresas: Array<Empresa>;
  resultado: ResultadoResponse;


  user: User;
  previewAvatar = '';

  get empresaControl(): FormControl {
    return this.form.get('empresaId') as FormControl;
  }

  get razaoSocial(): FormControl {
    return this.form.get('razaoSocial') as FormControl;
  }

  form = this.fb.group({
    id: '',
    nomeCompleto: ['', [Validators.required]],
    email: [{value: '', disabled: true}, [Validators.email, Validators.required]],
    cpf: ['', AppValidators.cpf],
    status: [{value: '', disabled: true}],
    role: [''],
    razaoSocial: [''],
    empresaId: [{value: '', disabled: true}],
    cargo: ['', Validators.required],
  });

  constructor(
    protected app: AppService,
    protected auth: AuthService,
    protected usersService: UsersService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected fb: FormBuilder
  ) {
  }


  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.empresas = data.empresas;
    });
    this.user = this.auth.getUser();
    this.previewAvatar = this.user.fotoPerfil.concat('?t=', Date.now().toString());
    this.form.patchValue(this.user);
    this.form.get('empresaId').setValue(this.user.empresaId || (this.user.razaoSocial ? '0' : ''));
    this.setup();
  }

  removeAvatar() {
    this.shouldRemoveAvatar = true;
  }

  setup() {
    this.fotoPerfil = new FormGroup({
      file: new FormControl('')
    });

    this.empresaControl.valueChanges.subscribe(r => {
      if (r === '0') {
        this.razaoSocial.setValidators(Validators.required);
      } else {
        this.razaoSocial.clearValidators();
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
        await this.usersService.editMe(this.form.value);
        if (this.fotoPerfil.value.file) {
          await this.usersService.updateAvatar(this.fotoPerfil.value.file, 'me');
        } else if (this.shouldRemoveAvatar) {
          await this.usersService.removeAvatar('me');
        }
        await this.auth.syncUserInfo();

        this.app.alert('Suas informações foram atualizadas com sucesso').then();

      } catch (error) {
        this.app.alert('Não foi possivel atualizar seus dados').then();
        console.error(error);
      }
      this.loading.hide();
    }
  }

}
