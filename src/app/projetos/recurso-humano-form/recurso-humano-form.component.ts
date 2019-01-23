import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from '../projeto.service';

@Component({
    selector: 'app-recurso-humano-form',
    templateUrl: './recurso-humano-form.component.html',
    styleUrls: ['./recurso-humano-form.component.scss']
})
export class RecursoHumanoFormComponent {
    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) { }
}
