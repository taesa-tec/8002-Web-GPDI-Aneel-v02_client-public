import { Component, OnInit, Input } from '@angular/core';
import { Projeto } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { indexOf, find } from 'lodash-es';

@Component({
  selector: 'app-projeto-card',
  templateUrl: './projeto-card.component.html',
  styleUrls: ['./projeto-card.component.scss']
})
export class ProjetoCardComponent implements OnInit {


  @Input() projeto: Projeto;

  listStatus: any[];
  status: { id: number; status: string; } = { id: 0, status: '' };


  constructor(protected catalog: CatalogsService) { }

  ngOnInit() {
    this.catalog.status()

      .subscribe(list => {
        this.status = find(list, item => {
          return item.id === this.projeto.catalogStatusId;
        })
        this.listStatus = list;
      });
  }

  get icon() {

    switch (this.status.id) {
      case 1:
        return "ta-ficha";
      case 2:
        return "ta-capacete";
      default:
        return "ta-ok";

    }
  }

}
