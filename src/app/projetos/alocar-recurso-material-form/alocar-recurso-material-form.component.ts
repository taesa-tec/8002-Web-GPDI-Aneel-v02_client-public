import { Component, OnInit } from '@angular/core';
import { ProjetosService } from '@app/projetos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-alocar-recurso-material-form',
    templateUrl: './alocar-recurso-material-form.component.html',
    styleUrls: ['./alocar-recurso-material-form.component.scss']
})
export class AlocarRecursoMaterialFormComponent {

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService) { }
}
