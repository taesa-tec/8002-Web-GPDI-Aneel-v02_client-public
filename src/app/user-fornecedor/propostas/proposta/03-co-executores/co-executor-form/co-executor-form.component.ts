import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {AppValidators} from '@app/commons';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {CAPTACAO_ID} from '@app/user-fornecedor/propostas/proposta/shared';

@Component({
  selector: 'app-co-executor-form',
  templateUrl: './co-executor-form.component.html',
  styleUrls: ['./co-executor-form.component.scss']
})
export class CoExecutorFormComponent implements OnInit {
  captacaoId: number;
  coExecutor: any;
  form = this.fb.group({
    id: [0],
    cnpj: ['', [Validators.required, AppValidators.cnpj]],
    uf: ['', Validators.required],
    razaoSocial: ['', Validators.required],
    funcao: ['', Validators.required]
  });


  constructor(
    private app: AppService,
    private service: PropostasService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    if (this.coExecutor) {
      this.form.patchValue(this.coExecutor);
    }
  }


  async excluirEmpresa() {
    if (this.coExecutor && await this.app.confirm('Tem certeza que deseja excluir esta entidade?')) {
      try {

        await this.service.removerCoExecutor(this.captacaoId, this.coExecutor.id);
        this.activeModal.close(true);
      } catch (e) {
        console.log(e);
        if (e.error && e.error.detail) {
          this.app.alert(e.error.detail, 'Erro').then();
        } else {
          this.app.alert('Erro ao remover entidade, tente novamente mais tarde', 'Erro').then();
        }
      }
    }
  }

  async onSubmit() {
    if (this.form.valid && this.captacaoId) {
      try {
        await this.service.saveCoExecutor(this.captacaoId, this.form.value);
        this.activeModal.close(true);
      } catch (e) {
        console.error(e);
      }
    }
  }

}
