import {Component, OnInit, ViewChild} from '@angular/core';
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
export class ForgetPassComponent implements OnInit {

  @ViewChild(LoadingComponent, {static: true})
  private loading: LoadingComponent;

  resultadoResponse: ResultadoResponse;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(protected authService: AuthService, private router: Router, protected app: AppService) {
  }

  ngOnInit() {

  }

  async onSubmit() {
    this.loading.show();
    this.resultadoResponse = null;
    try {
      this.resultadoResponse = await this.authService.recuperarSenha(this.form.value);
      this.app.alert('Email de recuperação enviado').then();
      this.router.navigate(['/']).then();
    } catch (e) {
      console.error(e);
      this.app.alert('Email não encontrado!').then();
    }

    this.loading.hide();
  }

}
