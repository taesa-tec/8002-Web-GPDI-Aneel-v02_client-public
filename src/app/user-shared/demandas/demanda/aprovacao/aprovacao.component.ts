import {AppService} from '@app/services/app.service';
import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {DemandaEtapa, DemandaEtapaItems, DemandaEtapaStatus} from '@app/user-shared/demandas/commons';
import {environment} from '@env/environment';
import {EQUIPE_PED, EquipePeD, ROOT_URL} from '@app/commons';
import {UsersService} from '@app/services/users.service';
import {DEMANDA} from '@app/user-shared/demandas/demanda/providers';
import {AuthService} from '@app/services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileService} from '@app/services/file.service';


@Component({
  selector: 'app-pre-aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: []
})
export class AprovacaoComponent implements OnInit {

  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;
  anexos = [];
  formKey = 'especificacao-tecnica';
  pdfUrl = null;
  pdfProgress: any = 0;
  emAprovacao = false;
  comentarioCtrl = new FormControl('');
  form = new FormGroup({
    comentario: this.comentarioCtrl
  });

  protected $demanda: Demanda;

  get demanda(): Demanda {
    return this.$demanda;
  }

  set demanda(value: Demanda) {

    //this.pdfUrl = `${environment.api_url}/Demandas/${value.id}/Form/${this.formKey}/Pdf`;
    this.$demanda = value;
    this.emAprovacao = value.status === DemandaEtapaStatus.Pendente || value.status === DemandaEtapaStatus.EmElaboracao;

    const clearCache = Date.now();
    this.file.download(`${environment.api_url}/Demandas/${value.id}/Form/${this.formKey}/Pdf?time=${clearCache}`, p => {
      this.pdfProgress = (p.loaded / p.total) * 100;
    }).then(url => {
      this.pdfProgress = null;
      this.pdfUrl = url;
    }).catch(err => {
      this.pdfProgress = null;
      console.log(err);
    });
  }

  get isResponsavel() {
    return this.responsavelAprovacao === this.auth.user.id;
  }

  get responsavelAprovacao() {
    if (this.demanda.status !== DemandaEtapaStatus.ReprovadaPermanente) {
      switch (this.demanda.etapaAtual) {
        case DemandaEtapa.Elaboracao:
          return this.demanda.criadorId;
        case DemandaEtapa.PreAprovacao:
          return this.demanda.superiorDiretoId;
        case DemandaEtapa.AprovacaoRevisor:
          return this.demanda.revisorId;
        case DemandaEtapa.AprovacaoCoordenador:
        case DemandaEtapa.RevisorPendente:
          return this.equipe?.coordenador.id;
        case DemandaEtapa.AprovacaoGerente:
          return this.equipe?.gerente.id;
        case DemandaEtapa.AprovacaoDiretor:
          return this.equipe?.diretor.id;
      }
    }

    return null;
  }

  get etapa_atual() {
    const etapa_atual = DemandaEtapaItems.find(i => i.etapa === this.demanda.etapaAtual);
    return etapa_atual && etapa_atual.titulo || '';
  }

  constructor(
    @Inject(EQUIPE_PED) public equipe: EquipePeD,
    @Inject(DEMANDA) demanda: Demanda,
    @Inject(ROOT_URL) protected root_url: string,
    protected app: AppService,
    protected file: FileService,
    protected usersService: UsersService,
    public auth: AuthService,
    protected route: ActivatedRoute
  ) {
    this.demanda = demanda;
  }

  ngOnInit() {
    this.app.demandas.getAnexos(this.demanda.id).then(anexos => {
      this.anexos = anexos;
    });

    if (this.demanda.status === this.ETAPAS_STATUS.Reprovada) {
      this.comentarioCtrl.setValidators(Validators.required);
    }
    this.form.updateValueAndValidity();
  }

  async avaliacao(demanda) {
    this.demanda = demanda;
    this.app.router.navigate([this.root_url]).then();
  }

  async userSelected(value) {
    this.app.showLoading();
    try {
      this.demanda = await this.app.demandas.definirRevisor(this.demanda.id, value);
      this.app.alert('Revisor definido com sucesso!').then();
      this.app.router.navigate([this.root_url]).then();
    } catch (e) {
      console.error(e);
    }
    this.app.hideLoading();

  }

  async proximaEtapa() {

    if (!await this.app.confirm('Confirme o envio para a próxima etapa')) {
      return;
    }
    this.app.showLoading();
    try {
      this.demanda = await this.app.demandas.proximaEtapa(this.demanda.id, this.form.value);
      this.form.reset();
      await this.app.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    } finally {

      this.app.hideLoading();
    }
  }

  async download(anexo) {
    if (this.demanda.id) {
      this.app.showLoading();
      try {
        await this.app.demandas.downloadAnexo(this.demanda.id, anexo);
      } catch (e) {
        console.error(e);
      }
      this.app.hideLoading();
    } else {
      console.error('Sem demanda!');
    }
  }

}
