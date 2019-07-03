import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {ResultadoResponse} from '@app/models';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AuthService} from '@app/core/services/auth.service';

@Component({
    selector: 'app-forget-pass',
    templateUrl: './forget-pass.component.html',
    styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    resultadoResponse: ResultadoResponse;

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    constructor(protected authService: AuthService, private router: Router) {
    }

    ngOnInit() {

    }

    onSubmit() {
        this.loading.show();
        this.resultadoResponse = null;
        this.authService.recuperarSenha(this.form.value).subscribe(r => {
            this.loading.hide();
            this.resultadoResponse = r;
        });
    }

}
