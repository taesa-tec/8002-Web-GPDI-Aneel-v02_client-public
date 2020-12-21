import { Component, OnInit } from '@angular/core';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-detalhe-proposta',
  templateUrl: './detalhe-proposta.component.html',
  styleUrls: ['./detalhe-proposta.component.scss']
})
export class DetalhePropostaComponent implements OnInit {

  proposta: any;

  constructor(
    protected app: AppService,
  ) { }

  ngOnInit() {
    this.proposta = this._getProposta();
  }

  _getProposta() {
    return {
      modeloContrato: 'Contrato Padrão',
      arquivos: ['Relatório.pdf', 'Relatório 2.pdf'],
      consideracoes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra malesuada ante nec ornare. Nam id ante et odio efficitur cursus. Maecenas viverra turpis a eros pretium porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi porttitor ligula id lacus maximus, eu rhoncus tortor volutpat. Curabitur auctor nulla sed lacus maximus vulputate. Fusce elementum metus nec urna malesuada, a accumsan eros sodales. Suspendisse dolor nisi, aliquet non luctus ac, sodales quis metus. Nunc a fermentum mauris. Sed a nulla eget purus ultricies semper. Mauris vitae eros nec eros lacinia efficitur. In vitae justo scelerisque, elementum magna eu, placerat magna. Mauris faucibus varius nisl eu vehicula.',
      dataProposta: '2020-06-05',
      fornecedores: ['Nome Fornecedores 01', 'Nome Fornecedores 02']
    };
  }

}
