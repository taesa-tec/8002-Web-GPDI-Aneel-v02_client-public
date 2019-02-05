import { Component, OnInit, Input } from '@angular/core';
import { Projeto, Empresa } from '@app/models';
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { filter } from 'lodash-es';

@Component({
  selector: 'app-projetos-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  total_projetos = 0;
  empresas = this.catalog.empresas();
  status = this.catalog.status();

  filterForm = new FormGroup({
    catalogStatusId: new FormControl(''),
    catalogEmpresaId: new FormControl(''),
    search: new FormControl(''),
  });

  @Input() projetos: Array<Projeto>;

  constructor(protected catalog: CatalogsService) { }

  ngOnInit() {
   
  }

  get projetosFiltered() {
    const value = this.filterForm.value;
    let projetos = this.projetos;
    if (value.catalogStatusId.length > 0) {
      projetos = filter(this.projetos, p => p.catalogStatusId === parseInt(value.catalogStatusId, 10));
    }

    if (value.catalogEmpresaId.length > 0) {
      projetos = filter(this.projetos, p => p.catalogEmpresaId === parseInt(value.catalogEmpresaId, 10));
    }

    if (value.search.trim().length > 0) {
      const search = value.search.trim().toLowerCase();
      projetos = filter(this.projetos, (p: Projeto) => {
        return p.titulo.toLowerCase().match(search) !== null || p.numero.match(search) !== null;
      });
    }



    return projetos;
  }



}
