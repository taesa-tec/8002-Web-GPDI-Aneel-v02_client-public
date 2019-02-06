import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { User, Roles, Empresa, ResultadoResponse, Projetos, NiveisAcessoProjeto, AppValidators } from '@app/models';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { projetos } from '@mockup/projetos';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { Router } from '@angular/router';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-edit-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  @Input() currentUser: User;

  form: FormGroup;
  roles = Roles;
  empresas: Array<Empresa>;
  resultado: ResultadoResponse;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  @Output() submited: EventEmitter<ResultadoResponse> = new EventEmitter<ResultadoResponse>();

  @Input() user: User;

  projetos: Projetos = projetos;
  niveis = NiveisAcessoProjeto;

  constructor(
    protected catalog: CatalogsService,
    protected usersService: UsersService,
    protected router: Router,
    protected ui: AppService
  ) { }

  get empresaControl(): FormControl {
    return this.form.get('catalogEmpresaId') as FormControl;
  }
  get razaoSocial(): FormControl {
    return this.form.get('razaoSocial') as FormControl;
  }

  ngOnInit() {
    this.catalog.empresas().subscribe(e => { this.empresas = e; this.getCurrentUser(); });

  }

  getCurrentUser() {
    this.usersService.me().subscribe(u => {

      this.form = new FormGroup({
        nomeCompleto: new FormControl(u.nomeCompleto, [Validators.required]),
        email: new FormControl(u.email, [Validators.email, Validators.required]),
        cpf: new FormControl({ value: u.cpf, disabled: true }),
        status: new FormControl({ value: u.status, disabled: true }),
        role: new FormControl(u.role),
        catalogEmpresaId: new FormControl({ value: u.catalogEmpresaId || (u.razaoSocial ? '0' : ''), disabled: false }),
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
    if (this.form.valid) {
      this.loading.show();
      try {

        if (this.form.value.catalogEmpresaId === "0") {
          this.form.value.catalogEmpresaId = null;
        }

        this.usersService.editMe(this.form.value).subscribe(resultado => {
          this.loading.hide();
          if (resultado.sucesso) {
            this.ui.alert("Suas informaçõs foram atualizadas com sucesso");
            this.usersService.me(true);
          } else {
            this.ui.alert(resultado.inconsistencias.join('<br>'));
          }
        });

      } catch (error) {
        console.error(error);
        this.loading.hide();
      }
    }
  }

}
