import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { PropriedadeIntelectual } from '../../relatorio';
import { AppService } from '@app/services';
import * as moment from 'moment';
import { sumBy } from 'lodash-es';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  propriedade: PropriedadeIntelectual;
  recursos: Array<any>;
  depositantes: Array<any>;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    pedidoData: ['', Validators.required],
    pedidoNumero: ['', Validators.required],
    tituloINPI: ['', Validators.required],
    inventores : [[], Validators.required],
    depositantes: this.fb.array([], Validators.required)
  });

  depositantesControls = this.form.get('depositantes') as FormArray;

  constructor(
    private app: AppService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();

    if(this.propriedade) {
      this.form.patchValue({
        ...this.propriedade,
        inventores: this.propriedade.inventores.map(a => a.id),
        pedidoData: moment(this.propriedade.pedidoData).format("yyyy-MM-DD")
      });
      this.propriedade.depositantes.forEach(d => {
        this.addDepositante({
          id: d.empresaId ? `e-${d.empresaId}` : `c-${d.coExecutorId}`,
          porcentagem: d.porcentagem
        });
      });
    } else {
      this.addDepositante();
    }
  }

  addDepositante(depositante?: any) {
    this.depositantesControls.push(this.fb.group({
      id: [depositante?.id || '', Validators.required],
      porcentagem: [depositante?.porcentagem || '', Validators.required]
    }));
  }

  removeDepositante(index: number) {
    if (this.form.enabled) {
      this.depositantesControls.removeAt(index);
    }
  }

  selectedDepositantes() {
    return this.depositantesControls.value.map(a => a.id);
  }

  async delete() {
    try {
      if(this.validate()) {
        if(await this.app.confirm("Tem certeza que deseja excluir esta propriedade intelectual?")) {
          await this.service.delete(`${this.projeto.id}/Relatorio/PropriedadeIntelectual/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  validate() {
    return (this.form.valid && sumBy(this.form.value.depositantes, 'porcentagem') === 100);
  }

  async submit() {
    try {
      if(this.validate()) {
        const propriedade = this.form.value;
        propriedade.depositantes = propriedade.depositantes.map(d => {
          const ee = d.id.split('-');
          return {
            empresaId: ee[0] === 'e' ? parseFloat(ee[1]) : null,
            coExecutorId: ee[0] === 'c' ? parseFloat(ee[1]) : null,
            porcentagem: d.porcentagem
          }
        }); 
        
        const path = `${this.projeto.id}/Relatorio/PropriedadeIntelectual`;

        if(propriedade.id) {
          await this.service.put(path, propriedade);
        } else {
          await this.service.post(path, propriedade);
        }
        this.activeModal.close();
      }
    } catch(e) {
      console.log(e.message);
    }
  }

}
