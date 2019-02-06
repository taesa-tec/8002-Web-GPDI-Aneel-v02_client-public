import { Component, OnInit, Input } from '@angular/core';
import { Projeto, Empresa } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { indexOf, find } from 'lodash-es';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projeto-card',
  templateUrl: './projeto-card.component.html',
  styleUrls: ['./projeto-card.component.scss']
})
export class ProjetoCardComponent implements OnInit {


  @Input() projeto: Projeto;

  listStatus: any[];
  status: { id: number; status: string; } = { id: 0, status: '' };
  empresa: Empresa;


  constructor(protected catalog: CatalogsService) { }

  ngOnInit() {

    const status$ = this.catalog.status().pipe(map(list => list.find(i => i.id === this.projeto.catalogStatusId)));
    const empresa$ = this.catalog.empresa(this.projeto.catalogEmpresaId);

    zip(status$, empresa$).subscribe(([status, empresa]) => {
      this.empresa = empresa;
      this.status = status;
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
  get categoria() {
    return this.projeto.numero.match(/^9.+/) ? "Projeto Administrativo" : "Projeto Científico";
  }

}
