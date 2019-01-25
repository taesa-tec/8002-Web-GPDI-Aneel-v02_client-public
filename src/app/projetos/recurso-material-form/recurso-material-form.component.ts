import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos.service';

@Component({
    selector: 'app-recurso-material-form',
    templateUrl: './recurso-material-form.component.html',
    styleUrls: ['./recurso-material-form.component.scss']
})
export class RecursoMaterialFormComponent {

    constructor(public activeModal: NgbActiveModal, private projetosService: ProjetosService) { }
}
