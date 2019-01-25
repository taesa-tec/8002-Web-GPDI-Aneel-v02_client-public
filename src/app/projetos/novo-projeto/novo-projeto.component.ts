import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjetoStatus } from '@app/models';

@Component({
    selector: 'app-novo-projeto',
    templateUrl: './novo-projeto.component.html',
    styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService) { }

    maxTituloContent = 500;
    projetoForm = new FormGroup({
        numero: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
        ]),
        titulo: new FormControl('', [
            Validators.maxLength(50),
            Validators.required
        ]),
        tituloDesc: new FormControl('', [
            Validators.maxLength(this.maxTituloContent),
            Validators.required
        ]),
        empresaProponente: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
    });

    get tituloDescRestante() {
        return this.maxTituloContent - this.tituloDesc.value.length;
    }

    get numero() {
        return this.projetoForm.get('numero');
    }

    get titulo() {
        return this.projetoForm.get('titulo');
    }
    get tituloDesc() {
        return this.projetoForm.get('tituloDesc');
    }
    get empresaProponente() {
        return this.projetoForm.get('empresaProponente');
    }
    get status() {
        return this.projetoForm.get('status');
    }
    ngOnInit() {
        console.log(this.projetoForm);
    }

    onSubmit() {
        console.log(this.projetoForm);
    }

    save() {
        
    }

}
