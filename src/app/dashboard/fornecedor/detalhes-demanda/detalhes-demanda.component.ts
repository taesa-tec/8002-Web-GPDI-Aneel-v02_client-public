import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalDemandaComponent } from './modal-demanda/modal-demanda.component';
import { environment } from '@env/environment';

interface DetalhesDemanda {
  especificacao: { id: number, pdf: string };
  arquivos: Array<string>;
  dataProposta: string;
  observacoes: string;
  status: boolean;
}

@Component({
  selector: 'app-detalhes-demanda',
  templateUrl: './detalhes-demanda.component.html',
  styleUrls: ['./detalhes-demanda.component.scss']
})
export class DetalhesDemandaComponent implements OnInit {

  pdfUrl = null;
  detalhesDemanda: DetalhesDemanda;

  constructor(
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.detalhesDemanda = this.getDetalhesProjeto();

    const clearCache = Date.now();
    this.pdfUrl = `${environment.api_url}/Demandas/${this.detalhesDemanda.especificacao.id}/Form/${this.detalhesDemanda.especificacao.pdf}/Pdf?time=${clearCache}`;
  }

  async statusParticipar(status: boolean) {
    if(!status) {
      const modalRef = this.modal.open(ModalDemandaComponent, {size: 'lg'});

      try {
        await modalRef.result;
        console.log('Não Aceito a demanda');
        this.detalhesDemanda.status = false;
      } catch(e) {
        console.log(e);
      }

    } else{
      console.log('Demanda aceita');
      this.detalhesDemanda.status = true;
    }
  }

  getDetalhesProjeto() {
    return {
      especificacao: {
        id: 2,
        pdf: 'especificacao-tecnica'
      },
      arquivos: ['Relatório.pdf', 'Relatório 2.pdf'],
      dataProposta: '2019-01-02',
      observacoes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra malesuada ante nec ornare. Nam id ante et odio efficitur cursus. Maecenas viverra turpis a eros pretium porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi porttitor ligula id lacus maximus, eu rhoncus tortor volutpat. Curabitur auctor nulla sed lacus maximus vulputate. Fusce elementum metus nec urna malesuada, a accumsan eros sodales. Suspendisse dolor nisi, aliquet non luctus ac, sodales quis metus. Nunc a fermentum mauris. Sed a nulla eget purus ultricies semper. Mauris vitae eros nec eros lacinia efficitur. In vitae justo scelerisque, elementum magna eu, placerat magna. Mauris faucibus varius nisl eu vehicula.',
      status: null
    };
  }

}
