import {Component, OnInit} from '@angular/core';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {SidebarMenuProvider} from '@app/pages/projetos/projeto/projeto';

export interface Projeto {
  responsavelId: string;
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
  providers: [SidebarMenuProvider]
})
export class ProjetoComponent implements OnInit {

  projeto: Projeto;

  constructor(protected service: ProjetoService) {
  }

  ngOnInit(): void {
    this.service.projeto.subscribe(p => this.projeto = p);
  }

}
