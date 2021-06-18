import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExtratoEmpresa} from '@app/pages/projetos/projeto/extrato-financeiro/extrato-financeiro';

@Component({
  selector: 'app-extrato-financeiro',
  templateUrl: './extrato-financeiro.component.html',
  styleUrls: ['./extrato-financeiro.component.scss']
})
export class ExtratoFinanceiroComponent implements OnInit {

  extrato: Array<ExtratoEmpresa> = [];
  realizado = 0;
  previsto = 0;
  desvio = '0';

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.extrato = data.extrato;
      this.realizado = this.extrato.reduce((p, c) => p + c.realizado, 0);
      this.previsto = this.extrato.reduce((p, c) => p + c.previsto, 0);
      this.desvio = (((this.realizado / this.previsto) - 1) * 100).toFixed(2);
    });
  }

  formatDesvio(previsto, realizado, desvio) {
    if (previsto === 0) {
      return '&infin;';
    }
    if (realizado === 0) {
      return 'N/A';
    }
    return `${desvio}%`;
  }

}
