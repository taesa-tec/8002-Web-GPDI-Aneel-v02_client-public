import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '@app/services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {Socioambiental} from '../../relatorio';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  socioambiental: Socioambiental;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    resultadoPositivo: ['', Validators.required],
    descricaoResultado: ['', Validators.required]
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

    if (this.socioambiental) {
      this.form.patchValue(this.socioambiental);
    }
  }

  async delete() {
    try {
      if (this.form.valid) {
        if (await this.app.confirm('Tem certeza que deseja excluir este socioambiental?')) {
          await this.service.delete(`${this.projeto.id}/Relatorio/Socioambiental/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async submit() {
    try {
      if (this.form.valid) {
        const socioambienta = this.form.value;
        const path = `${this.projeto.id}/Relatorio/Socioambiental`;

        if (socioambienta.id) {
          await this.service.put(path, socioambienta);
        } else {
          await this.service.post(path, socioambienta);
        }
        this.activeModal.close();
      }
    } catch (e) {
      console.error(e);
    }
  }

}
