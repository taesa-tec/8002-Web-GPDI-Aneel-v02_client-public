import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {User, Roles, Empresa, ResultadoResponse} from '@app/models';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {Router} from '@angular/router';
import {AppService} from '@app/services/app.service';
import {environment} from '@env/environment';
import {UsersService} from '@app/services/users.service';
import {AuthService} from '@app/services/auth.service';

@Component({
  selector: 'app-edit-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

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
    return `${environment.api_url}/Users/${this.user.id}/avatar`;
  }

  get empresaControl(): FormControl {
    return this.form.get('catalogEmpresaId') as FormControl;
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
      catalogEmpresaId: new FormControl({value: u.catalogEmpresaId || (u.razaoSocial ? '0' : ''), disabled: false}),
      fotoPerfil: this.fotoPerfil,

      cargo: new FormControl(u.cargo, Validators.required)
    });

    if (u.id) {
      this.form.addControl('id', new FormControl(u.id));
    }
    if (u.catalogEmpresaId === null) {
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

        if (this.form.value.catalogEmpresaId === '0') {
          this.form.value.catalogEmpresaId = null;
        }

        const resultado = await this.usersService.editMe(this.form.value);
        if (resultado.sucesso) {
          this.app.alert('Suas informações foram atualizadas com sucesso');
          this.auth.user.nomeCompleto = this.form.value.nomeCompleto;
          this.auth.user.cargo = this.form.value.cargo;
          // await this.app.users.setCurrentUser();
        } else {
          this.app.alert(resultado.inconsistencias);
        }

      } catch (error) {
        console.error(error);
      }
      this.loading.hide();
    }
  }

}
