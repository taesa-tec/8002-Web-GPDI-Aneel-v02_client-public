import {AppService} from '@app/services/app.service';
import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {DemandaEtapa, DemandaEtapaItems, DemandaEtapaStatus} from '@app/pages/demandas/commons';
import {environment} from '@env/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HistoricoComponent} from '@app/pages/demandas/demanda/historico/historico.component';
import {DEMANDA} from '@app/pages/demandas/demanda/providers';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-documento-aprovacoes',
  templateUrl: './documento-aprovacoes.component.html',
  styleUrls: ['./documento-aprovacoes.component.scss']
})
export class DocumentoAprovacoesComponent implements OnInit {

  protected $demanda: Demanda;
  readonly ETAPAS_VALUES = DemandaEtapa;
  readonly ETAPAS_STATUS = DemandaEtapaStatus;
  anexos = [];
  formKey = 'especificacao-tecnica';
  pdfUrl = null;
  pdfProgress = null;
  form = new FormGroup({
    comentario: new FormControl('')
  });

  constructor(
    @Inject(DEMANDA) demanda: Demanda,
    protected file: FileService,
    protected app: AppService, protected route: ActivatedRoute, protected modal: NgbModal) {
    this.demanda = demanda;
  }

  get demanda(): Demanda {
    return this.$demanda;
  }

  set demanda(value: Demanda) {
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
    this.$demanda = value;
  }


  async ngOnInit() {

    this.anexos = await this.app.demandas.getAnexos(this.demanda.id);
    if (this.demanda.status === this.ETAPAS_STATUS.Reprovada) {
      this.form.get('comentario').setValidators(Validators.required);
    }
    this.form.updateValueAndValidity();
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
    console.log(anexo);
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

  async exibirHistorico() {
    try {
      const ref = this.modal.open(HistoricoComponent, {size: 'xl', scrollable: true});
      const comp = ref.componentInstance as HistoricoComponent;
      comp.form = this.formKey;
      comp.demanda = this.demanda;

      await ref.result;
    } catch (e) {
      await this.app.alert(e);
    }
  }
}

