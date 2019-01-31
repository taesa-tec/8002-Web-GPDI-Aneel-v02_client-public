import { Component, OnInit, Input } from '@angular/core';
import { ProjetosService } from '@app/projetos/projetos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-empresa-form',
    templateUrl: './empresa-form.component.html',
    styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

    @Input() empresa_id;
    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService) { }

    ngOnInit() {
    }

}
