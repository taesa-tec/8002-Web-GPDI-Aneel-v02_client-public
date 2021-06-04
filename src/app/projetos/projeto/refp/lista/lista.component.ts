import {Component, OnInit} from '@angular/core';
import {TableActionEvent, TableComponentActions, TableComponentCols} from '@app/core/components';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AprovadorComponent} from '@app/projetos/projeto/refp/aprovador/aprovador/aprovador.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  title = '';
  cols: TableComponentCols = [
    {title: 'Nome/Beneficiário', field: 'recurso'},
    {title: 'Categoria Contábil', field: 'categoriaContabil'},
    {title: 'Empresa Pagadora', field: 'financiador'},
    {title: 'Empresa Recebedora', field: 'recebedor'},
    {title: 'Valor', field: 'custo', type: 'currency'},
  ];
  data: any[] = [];
  actions: TableComponentActions = [{text: 'Ver Detalhes', icon: 'ta-eye', action: './#${id}', isLink: true, className: 'btn btn-primary'}];


  constructor(protected route: ActivatedRoute, protected modal: NgbModal, protected router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(d => {
      this.data = d.registros;
      this.title = d.title;
      if (d.registro) {
        this.openModal(d.registro).then();
      }
    });

  }

  async openModal(registro) {
    const ref = this.modal.open(AprovadorComponent, {size: 'lg'});
    ref.componentInstance.registro = registro;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();


  }

}
