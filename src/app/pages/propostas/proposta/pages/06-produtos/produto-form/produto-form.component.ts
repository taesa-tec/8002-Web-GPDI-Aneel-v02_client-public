import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingComponent} from '@app/core/components';
import {ProdutosService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  produto: any;
  tipos: Array<any> = [];
  fases: Array<any> = [];
  tiposProdutoDetalhados: Array<any> = [];
  faseCadeiaCtrl = this.fb.control('', Validators.required);
  tipoDetalhadoCtrl = this.fb.control('', Validators.required);

  form: FormGroup = this.fb.group({
    id: [0],
    classificacao: ['', Validators.required],
    titulo: ['', Validators.required],
    descricao: ['', Validators.required],
    tipoId: ['', Validators.required],
    faseCadeiaId: this.faseCadeiaCtrl,
    tipoDetalhadoId: this.tipoDetalhadoCtrl
  });
  route: ActivatedRoute;
  canEdit: boolean;
  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    private app: AppService,
    private fb: FormBuilder,
    protected service: ProdutosService,
    public activeModal: NgbActiveModal,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.propostaCanEdit.subscribe(can => this.canEdit = can);
    this.faseCadeiaCtrl.valueChanges.subscribe(value => {
      const fase = this.fases.find(f => f.id === value);
      this.tiposProdutoDetalhados = fase ? fase.tiposDetalhados : [];
      this.tipoDetalhadoCtrl.setValue('');

    });
    if (this.route.snapshot.data.produto) {
      this.form.patchValue(this.route.snapshot.data.produto);
    }
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading.show();
      try {
        await this.service.salvar(this.form.value);
        this.activeModal.close();
      } catch (e) {

        if (e.error && e.error.detail) {
          this.app.alert(e.error.detail, 'Erro').then();
        } else {
          this.app.alert('Erro ao salvar o produto, tente novamente mais tarde', 'Erro').then();
        }
      }
      this.loading.hide();
    }
  }

  async remover() {
    try {

      if (this.form.value.id !== 0 && await this.app.confirm('Tem certeza que deseja remover este produto?',
        'Confirme a exclusão?')) {
        await this.service.excluir(this.form.value.id);
        this.activeModal.close(true);
      }
    } catch (e) {

      if (e.error && e.error.detail) {
        this.app.alert(e.error.detail, 'Erro').then();
      } else {
        this.app.alert('Erro ao remover o produto, tente novamente mais tarde', 'Erro').then();
      }
    }
  }

}
