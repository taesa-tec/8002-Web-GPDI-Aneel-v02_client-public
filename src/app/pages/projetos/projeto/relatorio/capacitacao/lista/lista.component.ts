import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';
import { Capacitacao } from '../../relatorio';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  capacitacoes: Array<Capacitacao>;

  cols: TableComponentCols = [
    {title: 'Membro da Equipe', field: 'membro', order: true},
    {title: 'Capacitação', field: 'tipo', order: true},
    {title: 'Arquivo Cadastrado?', field: 'arquivo', 
      value: item => item.arquivoTrabalhoOrigemId ? 'Sim':'Não' ,order: true}
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
    this.route.data.subscribe(({capacitacoes}) => {
      if(Array.isArray(capacitacoes)) {
        this.capacitacoes = capacitacoes
      } else {
        this.openModal(capacitacoes)
      }
    });

    this.route.fragment.subscribe(data => {
      if(data == 'novo') {
        this.openModal();
      }
    });
  }

  async openModal(capacitacao?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.capacitacao = capacitacao;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
