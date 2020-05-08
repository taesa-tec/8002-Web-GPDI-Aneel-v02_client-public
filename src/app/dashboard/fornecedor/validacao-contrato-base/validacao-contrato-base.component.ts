import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '@app/services/app.service';
import { ClausulaFormComponent } from './clausula-form/clausula-form.component';

@Component({
  selector: 'app-validacao-contrato-base',
  templateUrl: './validacao-contrato-base.component.html',
  styleUrls: ['./validacao-contrato-base.component.scss']
})
export class ValidacaoContratoBaseComponent implements OnInit {

  clausulas: Array<any>;
  active: number = 1;
  
  constructor(
    private app: AppService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.clausulas = this._getClausulas();
  }

  getTitle() {
    let total = ('0' + this.clausulas.length).slice(-2);
    let item = ('0' + this.active).slice(-2);
    
    return `CLÁUSULA ${item}/${total}`;
  }
  
  prev() {
    this.active --;
  }
  
  next() {
    this.active ++;
  }

  async setStatus(status: boolean) {
    const clausula = this.clausulas.find(item => item.order == this.active);

    if(status) {
      clausula.status = true;
    } else {
      const modalRef = this.modal.open(ClausulaFormComponent, {size: 'lg'});
      modalRef.componentInstance.clausula = {
        title: this.getTitle(),
        data: this.clausulas.find(item => item.order == this.active)
      };

      try {
        await modalRef.result;
        clausula.status = true;
        
      } catch(e) {
        console.log(e);
      }
    }
  }

  getStatus() {
    return this.clausulas.find(item => item.order == this.active).status;
  }
  
  _getClausulas() {
    return [
      {
        id: 1,
        order: 1,
        text: 'Os prazos não devem exceder 24 meses para Desenvolvimento experimental, 15 meses para lote pioneiro, 12 meses para inserção no mercado. Esperado que o projeto atue bem abaixo destes valores.',
        status: null,
      },
      {
        id: 2,
        order: 2,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        status: null,
      },
      {
        id: 3,
        order: 3,
        text: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently.',
        status: null,
      },
      {
        id: 4,
        order: 4,
        text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.',
        status: null,
      },
      {
        id: 5,
        order: 5,
        text: 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.',
        status: null,
      }
    ]
  }

}
