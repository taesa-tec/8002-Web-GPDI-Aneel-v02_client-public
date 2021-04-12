import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment.local';

interface DetalhesProjeto {
  especificacao: {id: number; pdf: string};
  arquivos: Array<string>;
  fornecedores: Array<string>;
  observacoes: string;
}

@Component({
  selector: 'app-detalhes-projeto',
  templateUrl: './detalhes-projeto.component.html',
  styleUrls: ['./detalhes-projeto.component.scss']
})
export class DetalhesProjetoComponent implements OnInit {

  detalhesProjeto: DetalhesProjeto;
  pdfUrl = null;

  constructor() { }

  ngOnInit() {
    this.detalhesProjeto = this.getDetalhesProjeto();

    const clearCache = Date.now();
    this.pdfUrl = `${environment.api_url}/Demandas/${this.detalhesProjeto.especificacao.id}/Form/${this.detalhesProjeto.especificacao.pdf}/Pdf?time=${clearCache}`;
  }

  getDetalhesProjeto() {
    return {
      especificacao: {
        id: 2,
        pdf: 'especificacao-tecnica'
      },
      arquivos: ['Relatório.pdf', 'Relatório 2.pdf'],
      fornecedores: ['Nome Fornecedor 01', 'Nome Fornecedor 02', 'Nome Fornecedor 03'],
      observacoes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra malesuada ante nec ornare. Nam id ante et odio efficitur cursus. Maecenas viverra turpis a eros pretium porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi porttitor ligula id lacus maximus, eu rhoncus tortor volutpat. Curabitur auctor nulla sed lacus maximus vulputate. Fusce elementum metus nec urna malesuada, a accumsan eros sodales. Suspendisse dolor nisi, aliquet non luctus ac, sodales quis metus. Nunc a fermentum mauris. Sed a nulla eget purus ultricies semper. Mauris vitae eros nec eros lacinia efficitur. In vitae justo scelerisque, elementum magna eu, placerat magna. Mauris faucibus varius nisl eu vehicula.'
    };
  }

}
