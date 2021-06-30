import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { AppService } from '@app/services';
import { Apoio } from '../../relatorio';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  apoio: Apoio;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    cnpjReceptora: ['', Validators.required],
    laboratorio: ['', Validators.required],
    laboratorioArea: ['', Validators.required],
    materiaisEquipamentos: ['', Validators.required]
  });

  constructor(
    private app: AppService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();

    if(this.apoio) {
      this.form.patchValue(this.apoio);
    }
  }

  async delete() {
    try {
      if(this.form.valid) {
        if(await this.app.confirm("Tem certeza que deseja excluir este apoio a infra-estrutura?")) {
          await this.service.delete(`${this.projeto.id}/Relatorio/Apoio/${this.form.value.id}`);
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
        const apoio = this.form.value;
        const path = `${this.projeto.id}/Relatorio/Apoio`;

        if(apoio.id) {
          await this.service.put(path, apoio);
        } else {
          await this.service.post(path, apoio);
        }
        this.activeModal.close();
      }
    } catch(e) {
      console.log(e.message);
    }
  }

}
