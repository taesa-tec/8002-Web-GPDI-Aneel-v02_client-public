import { Component, OnInit } from '@angular/core';
import { InfoComponent } from '../../proposta/info/info.component';
import { AppService } from '@app/core/services/app.service';

@Component({
    selector: 'app-proposta-base',
    templateUrl: './proposta-base.component.html',
    styles: []
})
export class PropostaBaseComponent extends InfoComponent {

    constructor(protected app: AppService) {
        super(app);
    }

    formMountend() {
        this.form.disable();
    }
}
