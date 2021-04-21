import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators, FormGroup, FormArray} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {Component, OnInit} from '@angular/core';
import {EtapasService, ProdutosService} from '@app/proposta/services/proposta-service-base.service';
import {Proposta} from '@app/commons';
import {mesesSelectorRequered} from '@app/proposta/pages/07-etapas/etapa-form/meses-selector.component';
import {ActivatedRoute} from '@angular/router';
import {PropostasService} from '@app/proposta/services/propostas.service';

@Component({
  selector: 'app-etapa-form',
  templateUrl: './etapa-form.component.html',
  styleUrls: ['./etapa-form.component.scss']
})
export class EtapaFormComponent implements OnInit {
  route: ActivatedRoute;
  proposta: Proposta;
  produtos: Array<any>;
  mesesCtrl = this.fb.control([], mesesSelectorRequered);
  form = this.fb.group({
    id: [0],
    descricaoAtividades: ['', Validators.required],
    produtoId: ['', Validators.required],
    meses: this.mesesCtrl
  });

  constructor(
    public produtoService: ProdutosService,
    protected propostasService: PropostasService,
    protected service: EtapasService,
    private app: AppService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.propostasService.proposta.subscribe(p => this.proposta = p);
    this.produtoService.obter().then(p => this.produtos = p);
    if (this.route.snapshot.data.etapa) {
      this.form.patchValue(this.route.snapshot.data.etapa);
    }
  }


  async onSubmit() {
    if (this.form.valid) {
      try {

        await this.service.salvar(this.form.value);
        this.app.alert('Etapa salva com sucesso').then();
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar a etapa').then();
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
