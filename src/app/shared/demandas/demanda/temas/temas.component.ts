import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {


  temas: Array<any>;


  constructor() { }

  ngOnInit() {
    this.temas = [
      {
        id: '1',
        nome: 'Temas',
        valor: 'OU'
      }
    ]
  }

}
