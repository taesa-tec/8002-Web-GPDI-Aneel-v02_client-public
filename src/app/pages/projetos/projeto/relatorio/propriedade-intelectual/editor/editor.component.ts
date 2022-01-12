import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {PropriedadeIntelectual} from '../../relatorio';
import {AppService} from '@app/services';
import * as moment from 'moment';
import {sumBy} from 'lodash-es';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  propriedade: PropriedadeIntelectual;
  recursos: Array<any>;
  depositantes: Array<any>;
  chartData: [string, number, number][];

  depositantesControls = this.fb.array([], Validators.required);
  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    pedidoData: ['', Validators.required],
    pedidoNumero: ['', Validators.required],
    tituloINPI: ['', Validators.required],
    inventores: [[], Validators.required],
    depositantes: this.depositantesControls
  });


  constructor(
    private app: AppService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();

    if (this.propriedade) {
      this.form.patchValue({
        ...this.propriedade,
        inventores: this.propriedade.inventores.map(a => a.id),
        pedidoData: moment(this.propriedade.pedidoData).format('yyyy-MM-DD')
      });
      this.propriedade.depositantes.forEach(d => {
        this.addDepositante({
          empresaId: d.empresaId,
          porcentagem: d.porcentagem
        });
      });
    } else {
      this.addDepositante();
    }

    this.depositantesControls.valueChanges.subscribe(changes => {
      //this.corrigirDivisao();
      //this.buildChartData();
    });
    //this.corrigirDivisao();
    //this.buildChartData();
  }

  corrigirDivisao() {
    const depositantes = this.depositantesControls.value as Array<{ empresaId: string; porcentagem: number }>;
    const sum = depositantes.reduce((p, c) => p + c.porcentagem, 0);
    if (sum < 100) {
      return;
    }
    this.depositantesControls.controls.forEach(control => {
      const pc = control.get('porcentagem');
      const p = parseFloat(pc.value) ?? 0;
      const v = parseFloat(((p / sum) * 100).toFixed(1));
      pc.setValue(v, {emitEvent: false});
    });

  }

  buildChartData() {

    const depositantes = this.depositantesControls.value as Array<{ empresaId: string; porcentagem: number }>;
    const sum = depositantes.reduce((p, c) => p + c.porcentagem, 0);

    this.chartData = depositantes.map((e, i, es) => [
      this.depositantes.find(d => d.id === parseFloat(e.empresaId))?.nome ?? 'Não definido',
      sum > 0 ? (e.porcentagem / sum) * 100 : 100 / depositantes.length,
      e.porcentagem
    ]);
  }

  addDepositante(depositante?: any) {
    const depositantes = this.depositantesControls.value as Array<{ empresaId: string; porcentagem: number }>;
    const sum = depositantes.reduce((p, c) => p + c.porcentagem, 0);
    const p = sum > 0 ? Math.max(100 - sum, 0) : 0;
    this.depositantesControls.push(this.fb.group({
      empresaId: [depositante?.empresaId || '', Validators.required],
      porcentagem: [depositante?.porcentagem ?? p, [Validators.required, Validators.min(0)]]
    }));
  }

  removeDepositante(index: number) {
    if (this.form.enabled) {
      this.depositantesControls.removeAt(index);
    }
  }

  selectedDepositantes() {
    return this.depositantesControls.value.map(a => a.empresaId);
  }

  async delete() {
    try {
      if (await this.app.confirm('Tem certeza que deseja excluir esta propriedade intelectual?')) {
        await this.service.delete(`${this.projeto.id}/Relatorio/PropriedadeIntelectual/${this.form.value.id}`);
        this.activeModal.close();
      }
    } catch (e) {
      console.error(e);
    }
  }

  validate() {
    const depositantes = this.depositantesControls.value as Array<{ empresaId: string; porcentagem: number }>;
    const sum = depositantes.reduce((p, c) => p + (c.porcentagem * 100), 0) / 100;
    return (this.form.valid && sum === 100);
  }

  async submit() {
    try {
      if (this.validate()) {
        const propriedade = this.form.value;
        const path = `${this.projeto.id}/Relatorio/PropriedadeIntelectual`;

        if (propriedade.id) {
          await this.service.put(path, propriedade);
        } else {
          await this.service.post(path, propriedade);
        }
        this.activeModal.close();
      }
    } catch (e) {
      console.error(e);
    }
  }

}
