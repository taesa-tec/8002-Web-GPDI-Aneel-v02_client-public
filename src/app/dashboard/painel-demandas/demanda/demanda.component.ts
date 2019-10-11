import { AppService } from './../../../core/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: ['./demanda.component.scss']
})
export class DemandaComponent implements OnInit {

  menu: Array<any>;
  cod: string = 'ID001';
  tit: string = 'TÍTULO RESUMIDO PROJETO ENTRA AQUI';
  et: string = 'Demanda';

  constructor(private app: AppService, protected modal: NgbModal) {
  }

  ngOnInit() {
    this.menu = [
      { text: 'Definição Pessoas Processo Validação', icon: 'ta-user-id', path: 'definicao-pessoas-processo-validacao' },
      { text: 'Especificação Técnica', icon: 'ta-capacete', path: 'especificacao-tecnica' },
      { text: 'Temas', icon: 'ta-box', path: 'temas' },
      { text: 'Documento e Aprovações', icon: 'ta-projeto', path: 'documento-e-aprovacoes' },
      { text: 'Processo Aprovação Demanda', icon: 'ta-projeto', path: 'pre-aprovacao' },
      { text: 'Central Administrativa', icon: 'ta-central-admin', path: 'central-administrativa' },
      { text: 'Log Projeto', icon: 'ta-log', path: 'log-projeto' },
    ]
  }

}
