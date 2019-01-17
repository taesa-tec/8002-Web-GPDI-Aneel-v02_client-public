import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoService } from '../projeto.service';

@Component({
    selector: 'app-etapa-form',
    templateUrl: './etapa-form.component.html',
    styleUrls: ['./etapa-form.component.scss']
})
export class EtapaFormComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) { }

    ngOnInit() {
    }

}
