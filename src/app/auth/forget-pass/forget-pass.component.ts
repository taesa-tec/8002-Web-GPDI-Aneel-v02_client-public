import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {ResultadoResponse} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AuthService} from '@app/services/auth.service';
import {AppService} from '@app/services';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  resultadoResponse: ResultadoResponse;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(protected authService: AuthService, private router: Router, protected app: AppService) {
  }

  async onSubmit() {
    this.loading.show();
    this.resultadoResponse = null;
    try {
      this.resultadoResponse = await this.authService.recuperarSenha(this.form.value);
      this.app.alert('Um email será enviado caso o usuário seja cadastrado no sistema').then();
      this.router.navigate(['/']).then();
    } catch (e) {
      this.app.alert('Ocorreu um erro inesperado no servidor, tente novamente mais tarde').then();
      console.error(e);
    }

    this.loading.hide();
  }

}
