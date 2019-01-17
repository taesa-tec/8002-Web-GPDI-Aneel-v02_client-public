import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-empresa-form',
    templateUrl: './empresa-form.component.html',
    styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetoService) { }

    ngOnInit() {
    }

}
