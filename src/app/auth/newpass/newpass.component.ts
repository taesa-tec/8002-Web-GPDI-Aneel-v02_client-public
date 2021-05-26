import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';

import {ResultadoResponse, AppValidators} from '@app/commons';
import {LoadingComponent} from '@app/core/components/loading/loading.component';
import {AuthService} from '@app/services/auth.service';
import {AppService} from '@app/services';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.scss']
})
export class NewpassComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  resultadoResponse: ResultadoResponse;
  passconfirm: FormControl;

  form: FormGroup;

  constructor(protected authService: AuthService, protected app: AppService, protected router: Router, protected route: ActivatedRoute) {
  }

  get passwordConfirmed() {
    return this.form.get('passconfirm').value === this.form.get('newPassword').value;
  }


  ngOnInit() {
    const query = this.route.snapshot.queryParams;
    const token = query.token;
    this.passconfirm = new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      email: new FormControl(query.email, [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      passconfirm: this.passconfirm,
      ResetToken: new FormControl(token, [Validators.required])
    });


  }

  async onSubmit() {
    this.loading.show();
    this.resultadoResponse = null;
    try {
      if (await this.authService.novaSenha(this.form.value)) {
        await this.app.alert('Senha atualizada com sucesso!');
        this.router.navigateByUrl('/').then();
      }
    } catch (e) {
      await this.app.alert('Não foi possível atualizar sua senha, verifique se o token expirou e tente novamente');
      console.error(e);
    }
    this.loading.hide();
  }

}
