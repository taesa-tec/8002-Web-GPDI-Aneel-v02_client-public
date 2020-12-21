import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  projeto = {
    numero: 'ID001',
    titulo: 'TÍTULO RESUMIDO PROJETO ENTRA AQUI',
    fornecedor: {
      nome: 'XYZ Serviços'
    }
  };

  menu = [
    {text: 'Detalhes da Demanda', icon: 'ta-search', path: 'detalhes-demanda'},
    {text: 'Validação do Contrato Base', icon: 'ta-ficha', path: 'validacao-contrato-base'},
    {text: 'Cadastro Co-Executores', icon: 'ta-empresas', path: 'co-executores'},
    {text: 'Validação Contratos', icon: 'ta-gavel', path: 'validacao-contratos'},
    {text: 'Plano de Trabalho', icon: 'ta-work-plan', path: 'plano-trabalho'},
    {text: 'Escopo', icon: 'ta-projeto', path: 'escopo'},
    {text: 'Produtos', icon: 'ta-box', path: 'produtos'},
    {text: 'Etapas', icon: 'ta-etapas', path: 'etapas'},
    {text: 'Tabela de Riscos', icon: 'ta-warning', path: 'tabela-riscos'},
    {text: 'Recursos Humanos', icon: 'ta-group', path: 'recursos-humanos'},
    {text: 'Alocação de Recursos Humanos', icon: 'ta-alocacao-rh', path: 'alocacao-recursos-humanos'},
    {text: 'Recursos Materiais', icon: 'ta-recurso-material', path: 'resursos-materiais'},
    {text: 'Alocação de Recursos Materiais', icon: 'ta-alocacao-material', path: 'alocacao-recursos-materiais'},
    {text: 'Envio Proposta para aprovação', icon: 'ta-ok', path: 'envio-proposta-aprovacao'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
