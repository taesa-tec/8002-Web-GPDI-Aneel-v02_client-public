import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {RelatorioEtapa} from '../../relatorio';
import {AppService} from '@app/services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  relatorioEtapa: RelatorioEtapa;

  form = this.fb.group({
    id: [0, Validators.required],
    atividadesRealizadas: ['', Validators.required],
    etapa: this.fb.group({
      descricaoAtividades: [{value: '', disabled: true}],
      produto: [{value: '', disabled: true}]
    })
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

    if (this.relatorioEtapa) {
      this.form.patchValue(this.relatorioEtapa);
    }
  }

  async submit() {
    try {
      if (this.form.valid) {
        const relatorioEtapa = this.form.value;
        await this.service.put(`${this.projeto.id}/Relatorio/RelatorioEtapa`, relatorioEtapa);
        this.activeModal.close();
      }
    } catch (e) {
      this.app.alertError('Não foi possível salvar etapa').then();
      console.error(e);
    }
  }

}
