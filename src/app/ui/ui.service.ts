import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(protected modalService: NgbModal) { }

    alert(message: string, title: string = "Alerta") {
        const ref = this.modalService.open(AlertComponent);
        ref.componentInstance.title = title;
        ref.componentInstance.message = message;
        return ref.result;
    }
    confirm(message: string, title: string = "Confirme",
        options: { text: string, value: any, cssClass: string }[] =
            [
                { text: "Cancelar", value: false, cssClass: 'btn btn-link' },
                { text: "Ok", value: true, cssClass: 'btn-primary' }
            ]) {
        const ref = this.modalService.open(ConfirmComponent, { backdrop: 'static' });
        ref.componentInstance.message = message;
        ref.componentInstance.title = title;
        ref.componentInstance.options = options;
        return ref.result;
    }
}
