import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-log-item',
  templateUrl: './log.component.html',
  styles: []
})
export class LogComponent implements OnInit {

  @Input() log: {
    id: number;
    projetoId: number;
    projeto?: any;
    userId: string;
    applicationUser?: any;
    tela: string;
    acao: string;
    statusAnterior: string;
    statusNovo: string;
    created: string;
  };

  constructor() { }

  ngOnInit() {
    console.log(this.log);
    
  }

}
