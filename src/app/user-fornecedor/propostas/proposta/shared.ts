import {Directive, InjectionToken, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Proposta} from '@app/commons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '@app/services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropostaServiceBase} from '@app/user-fornecedor/services/propostas.service';

export const CAPTACAO_ID = new InjectionToken<number>('Captação Id');

@Directive()
export class PropostaNodeFormDirective implements OnInit {

  route: ActivatedRoute;
  proposta: Proposta;
  form: FormGroup;

  constructor(protected app: AppService,
              protected fb: FormBuilder,
              public activeModal: NgbActiveModal,
              protected service: PropostaServiceBase) {
  }

  ngOnInit(): void {
    this.service.captacaoId = this.proposta.captacaoId;
    if (this.route.snapshot.data.item) {
      this.form.patchValue(this.route.snapshot.data.item);
    }
  }


  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.salvar(this.form.value);
        this.app.alert('Salvo com sucesso!').then();
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar').then();
        console.error(e);
      }
    }
  }


  async remover() {
    if (this.form.value.id !== 0 && await this.app.confirm('Tem certeza que deseja remover?',
      'Confirme a exclusão?')) {
      await this.service.excluir(this.form.value.id);
      this.activeModal.close(true);
    }
  }

}
