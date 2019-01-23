import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-recurso-material-form',
    templateUrl: './recurso-material-form.component.html',
    styleUrls: ['./recurso-material-form.component.scss']
})
export class RecursoMaterialFormComponent {

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) { }
}
