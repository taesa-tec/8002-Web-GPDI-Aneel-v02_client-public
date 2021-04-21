import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Proposta, Validations} from '@app/commons';
import {PropostaComponent} from '@app/proposta/proposta.component';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {FileService} from '@app/services/file.service';
import {AppService} from '@app/services';
import {LoadingComponent} from '@app/core/components';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';

@Component({
  selector: 'app-envio-proposta',
  templateUrl: './envio-proposta.component.html',
  styles: []
})
export class EnvioPropostaComponent implements OnInit {

  protected _url: string;
  documento: any;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  url: SafeResourceUrl;
  validations: Validations = {isValid: false, ruleSetsExecuted: [], errors: []};

  proposta: Proposta;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    protected route: ActivatedRoute,
    protected app: AppService,
    protected sanitize: DomSanitizer,
    protected fileService: FileService,
    protected service: PropostasService) {
  }

  async downloadFile(file) {
    this.loading.show();
    try {
      await this.service.downloadArquivo(this.proposta.guid, file);
    } catch (e) {
      console.error(e);
    }
    this.loading.hide();
  }

  async downloadPdf() {
    this.loading.show();
    try {

      const url = await this.fileService.download(`Fornecedor/Propostas/${this.proposta.captacaoId}/Download/PlanoTrabalho`);
      this.fileService.downloadBlob(url, 'plano-de-trabalho.pdf');
    } catch (e) {
      console.error(e);
    }
    this.loading.hide();
  }

  async marcarComoFinalizado() {
    this.loading.show();
    try {
      const result = await this.service.marcarComoFinalizado(this.proposta.guid);
      this.app.alert('Proposta marcada como finalizada').then();
      this.proposta.planoFinalizado = true;
    } catch (e) {
      console.error(e);
      if (e.error?.detail) {
        this.app.alert(e.error?.detail, 'Erro!').then();
      }
    }
    this.loading.hide();
  }

  urlSection(section) {
    return this.sanitize.bypassSecurityTrustResourceUrl(this._url.concat(section));
  }

  ngOnInit(): void {
    this.service.proposta.subscribe(p => this.proposta = p);

    this.route.data.subscribe(data => {
      const blob = new Blob([data.documento.content], {type: 'text/html'});
      this._url = URL.createObjectURL(blob);
      this.validations = data.documento.validacao;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(this._url);
    });
  }

}
