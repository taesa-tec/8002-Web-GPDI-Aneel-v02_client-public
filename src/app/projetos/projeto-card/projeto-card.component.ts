import { Component, OnInit, Input } from '@angular/core';
import { Projeto } from 'src/app/shared/projeto.model';

@Component({
    selector: 'app-projeto-card',
    templateUrl: './projeto-card.component.html',
    styleUrls: ['./projeto-card.component.scss']
})
export class ProjetoCardComponent implements OnInit {


    @Input() projeto: Projeto;

    constructor() { }

    ngOnInit() {
    }

    get status() {
        switch (this.projeto.status) {
            case '1':
                return "Proposta";
            case '2':
                return "Iniciado";
            case '3':
                return "Encerrado";
            default:
                return "Desconhecido";

        }
    }
    get icon() {
        switch (this.projeto.status) {
            case '1':
                return "file-alt";
            case '2':
                return "business-time";
            case '3':
                return "check-circle";
            default:
                return "frown-open";

        }
    }

}
