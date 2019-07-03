import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { RegistroREFP } from '@app/models';
import { DynamicHostDirective } from '@app/core/shared/directives/dynamic-host.directive';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-registro-refp-details',
    templateUrl: './registro-refp-details.component.html',
    styles: []
})
export class RegistroRefpDetailsComponent implements OnInit {

    registro: {
        registro: RegistroREFP;
        nome: string;
        categoria: string;
        empresa: string;
        tipo: 'RM' | 'RH'
        valor: number;
    };

    get status() {
        if (this.registro) {
            return this.registro.registro.statusValor.toLocaleLowerCase();
        }
        return '';
    }
    get tipo() {

        if (this.registro) {
            return this.registro.tipo;
        }
        return '';
    }

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

    setRegistro(registro) {
        this.registro = registro;
    }

    buildForm() {

    }


}
