import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';
import { AppService } from '@app/services';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { IndicadorEconomico } from '../../relatorio';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  indicador: IndicadorEconomico;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    beneficio: ['', Validators.required],
    unidadeBase: ['', Validators.required],
    valorNumerico: ['', Validators.required],
    porcentagemImpacto: ['', Validators.required],
    valorBeneficio: ['', Validators.required]
  });

  constructor(
    private app: AppService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();

    if(this.indicador) {
      this.form.patchValue(this.indicador);
    }
  }

  async delete() {
    try {
      if(this.form.valid) {
        if(await this.app.confirm("Tem certeza que deseja excluir este indicador econômico?")) {
          await this.service.delete(`${this.projeto.id}/Relatorio/IndicadorEconomico/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {

    }
  }

  async submit() {
    try {
      if(this.form.valid) {
        const indicador = this.form.value;
        const path = `${this.projeto.id}/Relatorio/IndicadorEconomico`;

        if(indicador.id) {
          await this.service.put(path, indicador);
        } else {
          await this.service.post(path, indicador);
        }
        this.activeModal.close();
      }
    } catch(e) {

    }
  }

}
