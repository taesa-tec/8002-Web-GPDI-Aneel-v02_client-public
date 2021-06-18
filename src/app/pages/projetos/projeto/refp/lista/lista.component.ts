import {Component, OnInit} from '@angular/core';
import {TableComponentActions, TableComponentCols} from '@app/core/components';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AprovadorComponent} from '@app/pages/projetos/projeto/refp/aprovador/aprovador.component';
import {RegistroInfo} from '@app/pages/projetos/projeto/refp/registroInfo';
import {EditarComponent} from '@app/pages/projetos/projeto/refp/editar/editar.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  title = '';
  items: any;
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
      this.items = d.items;
      if (d.registro) {
        this.openModal(d.registro, d.observacoes).then();
      }
    });

  }

  async openModal(registro: RegistroInfo, obs?) {
    let ref: NgbModalRef;
    switch (registro.status) {
      case 'Aprovado':
      case 'Pendente':
        ref = this.modal.open(AprovadorComponent, {size: 'lg'});
        break;
      case 'Reprovado':
        ref = this.modal.open(EditarComponent, {size: 'lg'});
        ref.componentInstance.items = this.items;
        break;
    }
    ref.componentInstance.registro = registro;
    ref.componentInstance.observacoes = obs;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();


  }

}
