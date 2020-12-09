import {AppService} from '@app/services/app.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/models/demandas';
import {DemandaEtapa, DemandaEtapaItems, DemandaEtapaStatus} from '@app/dashboard/demandas/commons';
import {environment} from '@env/environment';
import {EquipePeD, User} from '@app/models';


@Component({
  selector: 'app-pre-aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: []
})
export class AprovacaoComponent implements OnInit {


  user: User;
  protected $demanda: Demanda;
  equipe: EquipePeD;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;
  anexos = [];
  formKey = 'especificacao-tecnica';
  pdfUrl = null;
  etapa_atual = '';
  emAprovacao = false;

  get demanda(): Demanda {
    return this.$demanda;
  }

  get responsavel() {
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

  set demanda(value: Demanda) {
    const etapaAtual = value.etapaAtual;
    const etapaAtualText = DemandaEtapaItems.find(i => i.etapa === value.etapaAtual);
    this.pdfUrl = `${environment.api_url}/Demandas/${value.id}/Form/${this.formKey}/Pdf`;
    this.etapa_atual = etapaAtualText && etapaAtualText.titulo || '';
    this.$demanda = value;
    this.emAprovacao = value.status === DemandaEtapaStatus.Pendente || value.status === DemandaEtapaStatus.EmElaboracao;
  }

  constructor(
    protected app: AppService,
    protected route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.user = this.app.users.currentUser;
    this.demanda = this.route.parent.snapshot.data.demanda.demanda;
    this.equipe = await this.app.sistema.getEquipePeD();
    this.anexos = await this.app.demandas.getAnexos(this.demanda.id);
  }

  async avaliacao(demanda) {
    this.demanda = demanda;
    this.app.router.navigate(['/dashboard']);
  }

  async userSelected(value) {
    console.log(value);
    this.app.showLoading();
    try {
      this.demanda = await this.app.demandas.definirRevisor(this.demanda.id, value);
      this.app.alert('Revisor definido com sucesso!');
      this.app.router.navigate(['/dashboard']);
    } catch (e) {
      console.error(e);
    }
    this.app.hideLoading();

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
