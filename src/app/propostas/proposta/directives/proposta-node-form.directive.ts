import {Directive, Inject, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Proposta} from '@app/commons';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from '@app/services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';
import {PropostaServiceBase} from '@app/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/propostas/proposta/shared';

@Directive()
export class PropostaNodeFormDirective implements OnInit {

  route: ActivatedRoute;
  proposta: Proposta;
  form: FormGroup;

  constructor(
    public canEdit: boolean,
    protected app: AppService,
    protected fb: FormBuilder,
    public activeModal: NgbActiveModal,
    protected service: PropostaServiceBase,
  ) {
  }

  ngOnInit(): void {

    if (this.route.snapshot.data.item) {
      this.form.patchValue(this.route.snapshot.data.item);
    }
    if (!this.canEdit) {
      this.form.disable();
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
    try {

      if (this.form.value.id !== 0 && await this.app.confirm('Tem certeza que deseja remover?',
        'Confirme a exclusão')) {
        await this.service.excluir(this.form.value.id);
        this.activeModal.close(true);
      }
    } catch (e) {
      console.log(e);
      if (e.error && e.error.detail) {
        this.app.alert(e.error.detail, 'Erro').then();
      } else {
        this.app.alert('Erro ao remover, tente novamente mais tarde', 'Erro').then();
      }
    }
  }

}
