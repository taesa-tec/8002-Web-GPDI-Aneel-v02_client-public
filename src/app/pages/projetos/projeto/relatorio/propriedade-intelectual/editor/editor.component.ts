import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { PropriedadeIntelectual } from '../../relatorio';
import { AppService } from '@app/services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  propriedade: PropriedadeIntelectual;
  recursos: Array<any>;
  depositantes = [
    {id: 1, nome: 'Depositante 1', porcentagem: '20'},
    {id: 2, nome: 'Depositante 2', porcentagem: '30'}
  ];

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
      this.form.patchValue(this.propriedade);
      this.depositantes.forEach(d => {
        this.addDepositante(d);
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
      if(this.form.valid) {
        if(await this.app.confirm("Tem certeza que deseja excluir esta propriedade intelectual?")) {
          await this.service.delete(`${this.projeto.id}/Relatorio/PropriedadeIntelectual/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async submit() {
    try {
      if(this.form.valid) {
        const propriedade = this.form.value;
        const path = `${this.projeto.id}/Relatorio/PropriedadeIntelectual`;
        console.log(propriedade);
        // if(propriedade.id) {
        //   await this.service.put(path, propriedade);
        // } else {
        //   await this.service.post(path, propriedade);
        // }
        //this.activeModal.close();
      }
    } catch(e) {
      console.log(e.message);
    }
  }

}
