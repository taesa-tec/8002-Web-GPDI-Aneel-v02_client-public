import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';

@Component({
    selector: 'app-alocar-recurso-humano-form',
    templateUrl: './alocar-recurso-humano-form.component.html',
    styleUrls: ['./alocar-recurso-humano-form.component.scss']
})
export class AlocarRecursoHumanoFormComponent {

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService) { }

}
