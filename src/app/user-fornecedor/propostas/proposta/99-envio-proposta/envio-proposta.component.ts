import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Validations} from '@app/commons';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {FileService} from '@app/services/file.service';
import {AppService} from '@app/services';
import {LoadingComponent} from '@app/core/components';

@Component({
  selector: 'app-envio-proposta',
  templateUrl: './envio-proposta.component.html',
  styles: []
})
export class EnvioPropostaComponent implements OnInit {

  protected _url: string;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  url: SafeResourceUrl;
  validations: Validations;

  get proposta() {
    return this.parent?.proposta;
  }

  constructor(protected route: ActivatedRoute,
              protected app: AppService,
              protected sanitize: DomSanitizer,
              protected parent: PropostaComponent,
              protected fileService: FileService,
              protected service: PropostasService) {
  }

  async downloadFile(file) {
    this.loading.show();
    try {
      await this.service.downloadArquivo(this.proposta.captacaoId, file);
    } catch (e) {
      console.error(e);
    }
    this.loading.hide();
  }

  async downloadPdf() {
    this.loading.show();
    try {

      const url = await this.fileService.download(`Fornecedor/Propostas/${this.proposta.captacaoId}/Documento/Download`);
      this.fileService.downloadBlob(url, 'plano-de-trabalho.pdf');
    } catch (e) {
      console.error(e);
    }
    this.loading.hide();
  }

  async marcarComoFinalizado() {
    this.loading.show();
    try {
      await this.service.marcarComoFinalizado(this.proposta.captacaoId);
      this.app.alert('Proposta marcada como finalizada').then();
    } catch (e) {
      console.error(e);
    }
    this.loading.hide();
  }

  urlSection(section) {
    return this.sanitize.bypassSecurityTrustResourceUrl(this._url.concat(section));
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this._url = data.documento;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(this._url);
      this.validations = data.erros;
    });
  }

}
