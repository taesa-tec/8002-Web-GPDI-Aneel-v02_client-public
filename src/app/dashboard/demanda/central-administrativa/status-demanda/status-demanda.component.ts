import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-demanda',
  templateUrl: './status-demanda.component.html',
  styleUrls: ['./status-demanda.component.scss']
})
export class StatusDemandaComponent implements OnInit {

  menuStatusEtapas = [
    { id: 1, text: 'Etapa 01 - Elaboração Demanda', value: 'Etapa 01' },
    { id: 2, text: 'Etapa 02 - Aprovação Demanda', value: 'Etapa 02' },
    { id: 3, text: 'Etapa 03 - Conclusão Demanda', value: 'Etapa 03' },
    { id: 4, text: 'Etapa 04 - Edição Demanda', value: 'Etapa 04' },
  ];
  constructor() { }

  ngOnInit() {
    this.menuStatusEtapas;
  }

  saveStatus(){
    console.log('Status Alterado');
    
  }
}
