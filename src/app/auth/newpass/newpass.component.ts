import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';

import {ResultadoResponse, AppValidators} from '@app/models';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AuthService} from '@app/core/services/auth.service';

@Component({
    selector: 'app-newpass',
    templateUrl: './newpass.component.html',
    styleUrls: ['./newpass.component.scss']
})
export class NewpassComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    resultadoResponse: ResultadoResponse;
    passconfirm: FormControl;

    form: FormGroup;

    constructor(protected authService: AuthService, protected router: Router, protected route: ActivatedRoute) {
    }

    get passwordConfirmed() {
        return this.form.get('passconfirm').value === this.form.get('newPassword').value;
    }


    ngOnInit() {
        const query = this.route.snapshot.queryParams;
        this.passconfirm = new FormControl('', [Validators.required]);
        this.form = new FormGroup({
            email: new FormControl(query.email, [Validators.required]),
            newPassword: new FormControl('', [Validators.required]),
            passconfirm: this.passconfirm,
            ResetToken: new FormControl(query.token.replace(/\s/g, '+'), [Validators.required])
        });


    }

    onSubmit() {
        this.loading.show();
        this.resultadoResponse = null;
        this.authService.novaSenha(this.form.value).subscribe(r => {
            this.loading.hide();
            this.resultadoResponse = r;
        });
    }

}
