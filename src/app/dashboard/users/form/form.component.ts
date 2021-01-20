import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {
  Empresa, ResultadoResponse, UserRole, Roles, AppValidators, User, CreateUserRequest,
  Projeto, Projetos
} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AppService} from '@app/services/app.service';
import {environment} from '@env/environment';
import {UsersService} from '@app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild(LoadingComponent, {static: true}) loading: LoadingComponent;

  @Output() submited: EventEmitter<ResultadoResponse> = new EventEmitter<ResultadoResponse>();
  @Input() user: User;
  @Input() handler: (value: any) => Promise<ResultadoResponse>;

  form: FormGroup;
  fotoPerfil: FormGroup;
  roles = Roles;
  empresas: Array<Empresa>;
  projetos: Projetos;
  resultado: ResultadoResponse;
  userId: string;
  projetoAcessosEnabled = true;

  get previewAvatar() {
    return `${environment.api_url}/Users/${this.user.id}/avatar`;
  }

  get empresaControl(): FormControl {
    return this.form.get('empresaId') as FormControl;
  }

  get razaoSocial(): FormControl {
    return this.form.get('razaoSocial') as FormControl;
  }

  constructor(protected app: AppService, protected usersService: UsersService) {
  }

  async ngOnInit() {

    this.empresas = await this.app.catalogo.empresas();

    const u = this.user;


    this.userId = u.id;
    this.fotoPerfil = new FormGroup({
      file: new FormControl('')
    });

    this.form = new FormGroup({
      nomeCompleto: new FormControl(u.nomeCompleto, [Validators.required]),
      email: new FormControl(u.email, [Validators.email, Validators.required]),
      cpf: new FormControl(u.cpf, [Validators.required, AppValidators.cpf]),
      status: new FormControl(u.status, [Validators.required]),
      role: new FormControl(u.role, [Validators.required]),
      empresaId: new FormControl(u.empresaId || (u.razaoSocial ? '0' : ''), [Validators.required]),
      fotoPerfil: this.fotoPerfil
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
    this.projetoAcessosEnabled = u.role === UserRole.User;
    this.form.get('role').valueChanges.subscribe(value => this.projetoAcessosEnabled = value === UserRole.User);
  }

  async submit() {
    if (this.form.valid && this.handler) {
      this.loading.show();

      try {
        if (this.form.value.empresaId === '0') {
          this.form.value.empresaId = null;
        }
        const response = await this.handler(this.form.value);
        this.submited.emit(response);

      } catch (error) {
        const r = {
          acao: '',
          sucesso: false,
          inconsistencias: [error.message]
        };
        this.submited.emit(r);
        this.resultado = error.inconsistencias ? error : r;
        console.log(error);
      } finally {
        this.loading.hide();
      }
    }
  }

  removeUser() {

  }

}
