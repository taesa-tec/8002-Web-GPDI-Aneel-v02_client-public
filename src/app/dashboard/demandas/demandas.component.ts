import { TodasDemandas } from '@app/dashboard/demandas/demandas-teste';
import {AppService} from '@app/core/services/app.service';
import {Component, OnInit} from '@angular/core';
import {NovaDemandaComponent} from "@app/dashboard/demandas/nova-demanda/nova-demanda.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-demandas',
    templateUrl: './demandas.component.html',
    styleUrls: ['./demandas.component.scss']
})
export class GestaoDeDemandasComponent implements OnInit {

    m: Array<any>;
    totalDem = TodasDemandas;
    constructor(private app: AppService, protected modal: NgbModal) {
    }

    ngOnInit() {
        this.m = [
            {text: 'Em Elaboração', qtd: this.totalDem.length, path: 'elaboracao'},
            {text: 'Reprovadas', qtd: this.totalDem.length, path: 'reprovadas'},
            {text: 'Aprovadas', qtd: this.totalDem.length, path: 'aprovadas'},
            {text: 'Enviadas para Captação', qtd: this.totalDem.length, path: 'enviadas-para-captacao'},
        ];
    }


    novaDemanda(demanda: any = {}) {
        const modalRef = this.modal.open(NovaDemandaComponent, {size: 'lg'});
        modalRef.componentInstance.demanda = demanda;
        modalRef.result.then(r => {
            console.log('Modal Aberto');
        }, e => {
          console.log('Modal Fechado');
        });
    }
}
