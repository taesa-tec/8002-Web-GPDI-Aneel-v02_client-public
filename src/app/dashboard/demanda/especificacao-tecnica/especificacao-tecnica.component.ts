import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-especificacao-tecnica',
  templateUrl: './especificacao-tecnica.component.html',
  styleUrls: ['./especificacao-tecnica.component.scss']
})
export class EspecificacaoTecnicaComponent implements OnInit {

  fr: any = 'Especificação Técnica';

  constructor() {
  }

  ngOnInit() {
  }


  onSubmit() {
    console.log(this.fr);
  }
}
