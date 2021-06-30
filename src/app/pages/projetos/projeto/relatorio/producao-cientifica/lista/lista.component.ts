import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';
import { ProducaoCientifica } from '../../relatorio';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  producoes: Array<ProducaoCientifica>;
  paises: Array<{ id: number; nome: string }>;

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Periódico', field: 'periodico', order: true},
    {title: 'Arquivo Cadastrado?', field: 'arquivo', order: true}
  ];

  buttons: TableComponentActions = [
    {isLink: true, text: 'Editar', action: './#${id}', className: 'btn btn-primary', icon: 'ta-edit'}
  ];

  constructor(
    protected route: ActivatedRoute, 
    protected modal: NgbModal, 
    protected router: Router
  ) {
  }

  ngOnInit(): void {
    const {paises} = this.route.snapshot.data;
    this.paises = paises;

    this.route.data.subscribe(({producoes}) => {
      if(Array.isArray(producoes)) {
        this.producoes = producoes
      } else {
        this.openModal(producoes)
      }
    });

    this.route.fragment.subscribe(data => {
      if(data == 'novo') {
        this.openModal();
      }
    });
  }

  async openModal(producao?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.producao = producao;
    ref.componentInstance.paises = this.paises;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
