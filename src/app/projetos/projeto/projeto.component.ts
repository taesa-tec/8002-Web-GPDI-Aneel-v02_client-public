import {Component, OnInit} from '@angular/core';
import {SIDEBAR_MENU} from '@app/commons';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';

export interface Projeto {
  titulo: string;
  tituloCompleto: string;
  status: 'Execucao' | 'Finalizado';
  propostaId: number;
  codigo: null;
  numero: string;
  proponenteId: number;
  proponente: null;
  captacao: null;
  captacaoStatus: string;
  fornecedorId: number;
  fornecedor: null;
  captacaoId: number;
  duracao: number;
  contratoFinalizado: boolean;
  planoFinalizado: boolean;
  dataCriacao: Date;
  dataAlteracao: Date;
  dataInicioProjeto: Date;
  dataFinalProjeto: Date;
  id: number;
}


@Component({
  templateUrl: './projeto.component.html',
  styles: [],
  providers: [
    {
      provide: SIDEBAR_MENU,
      useValue: [
        {text: 'Inserir Registro <br> REFP', icon: 'ta-edit', path: `refp/novo`},
        {text: 'Registros Pendentes <br> REFP', icon: 'ta-ampulheta', path: `refp/pendente`},
        {text: 'Registros Reprovados<br> REFP', icon: 'ta-cancel-circle', path: `refp/reprovado`},
        {text: 'Registros Aprovados<br> REFP', icon: 'ta-ok', path: `refp/aprovado`},
        {text: 'Extrato Financeiro', icon: 'ta-extrato', path: `extrato`},
        {text: 'Alterações Projeto', icon: 'ta-alert', path: `alteracoes`},
        {text: 'Consultar Dados<br> Planejamento Projeto', icon: 'ta-eye', path: `consulta`},
        {text: 'Central<br> Administrativa', icon: 'ta-central-admin', path: `central-administrativa`},
        {text: 'Log Projeto', icon: 'ta-log', path: `logs`},
      ]
    }
  ]
})
export class ProjetoComponent implements OnInit {

  projeto: Projeto;

  constructor(protected service: ProjetoService) {
  }

  ngOnInit(): void {
    this.service.projeto.subscribe(p => this.projeto = p);
  }

}
