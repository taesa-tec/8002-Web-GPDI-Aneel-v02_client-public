import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-demanda-comentario',
  templateUrl: './demanda-comentario.component.html',
  styleUrls: ['./demanda-comentario.component.scss']
})
export class DemandaComentarioComponent implements OnInit {

  @Input() comentario: { id: number; user: any; content: string; createdAt: string };

  constructor() {
  }

  ngOnInit() {
    if (this.comentario === null || this.comentario === undefined) {
      throw new Error('Comentário não foi fornecido');
    }
  }

}
