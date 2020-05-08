import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes-sistema',
  templateUrl: './configuracoes-sistema.component.html',
  styleUrls: ['./configuracoes-sistema.component.scss']
})
export class ConfiguracoesSistemaComponent implements OnInit {

  m: Array<any>;
  PessoasEquipe: Array<any> = [];
  i: number;
  adp = 1;

  constructor(protected app: AppService) { }

  ngOnInit() {
    this.m = [
      { text: 'Equipe de P&D', path: 'equipe-ped' },
      { text: 'Padrão Formulários', path: 'padrao-formularios' },
      { text: 'Contratos Padrão', path: 'contratos-padrao' },
      { text: 'Contrato Base', path: 'contrato-base' },
      { text: 'Fornecedores', path: 'fornecedores' },
    ];

    this.PessoasEquipe = [
      { id: 1, name: 'Jefferson Ferreira' },
      { id: 3, name: 'Filipe Loiola' },
      { id: 4, name: 'Diego França' },
      { id: 5, name: 'João Victor' },
      { id: 6, name: 'Lucas Matheus' },
      { id: 7, name: 'Bruno Galindo' },
      { id: 8, name: 'Ana Luisa' },
      { id: 9, name: 'Kaffael Salvaterra' },
      { id: 10, name: 'Clovis Markan' },
    ];
  }

  async add() {
    await console.log('Adicionou novo campo');
  }




  async salvar() {
    const resp = await this.app.alert('Cliquei ali ó');
  }

}
