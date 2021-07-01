import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponentActions, TableComponentCols } from '@app/core/components';
import { EditorComponent } from '../editor/editor.component';
import { DatePipe } from '@angular/common';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { Depositante, PropriedadeIntelectual } from '../../relatorio';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  propriedades: Array<PropriedadeIntelectual>;
  recursos: Array<any>;
  depositantes: Array<Depositante>;

  cols: TableComponentCols = [
    {title: 'Tipo', field: 'tipo', order: true},
    {title: 'Número INPI', field: 'pedidoNumero', order: true},
    {title: 'Data Pedido', field: 'pedidoData', pipe: new DatePipe('pt-BR'), value: item => [item.pedidoData, 'short'], order: true}
  ];

  buttons: TableComponentActions = [
    {isLink: true, text: 'Editar', action: './#${id}', className: 'btn btn-primary', icon: 'ta-edit'}
  ];

  constructor(
    protected service: ProjetoService, 
    protected route: ActivatedRoute, 
    protected modal: NgbModal, 
    protected router: Router
  ) {
  }

  async ngOnInit() {
    const projeto = this.service.getCurrentProjeto();
    this.recursos = await this.service.obter(`${projeto.id}/Recursos/Humanos`);
    this.depositantes = await this.service.obter(`${projeto.id}/Empresas`);
    
    this.route.data.subscribe(({propriedades}) => {
      if(Array.isArray(propriedades)) {
        this.propriedades = propriedades
      } else {
        this.openModal(propriedades)
      }
    });

    this.route.fragment.subscribe(data => {
      if(data == 'novo') {
        this.openModal();
      }
    });
  }

  async openModal(propriedade?: any) {
    let ref = this.modal.open(EditorComponent, {size: 'lg'});
    ref.componentInstance.propriedade = propriedade;
    ref.componentInstance.recursos = this.recursos;
    //ref.componentInstance.depositantes = this.depositantes;
    await ref.result;
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

}
