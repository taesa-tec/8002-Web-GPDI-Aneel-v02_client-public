import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Proposta, Validations} from '@app/commons';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {FileService} from '@app/services/file.service';
import {AppService} from '@app/services';
import {LoadingComponent} from '@app/core/components';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-envio-proposta',
  templateUrl: './envio-proposta.component.html',
  styles: []
})
export class EnvioPropostaComponent implements OnInit {

  protected _url: string;
  files: File[] = [];
  documento: any;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  url: SafeResourceUrl;
  validations: Validations = {isValid: false, ruleSetsExecuted: [], errors: []};

  proposta: Proposta;
  form = this.fb.group({
    alteracao: ['']
  });

  get fornecedorCanEdit() {
    return this.canEdit && (
      this.proposta.captacaoStatus === 'Fornecedor' ||
      (this.proposta.captacaoStatus === 'Refinamento' && this.proposta.planoTrabalhoAprovacao === 'Alteracao')
    );
  }

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    protected route: ActivatedRoute,
    protected router: Router,
    protected app: AppService,
    protected sanitize: DomSanitizer,
    protected fileService: FileService,
    protected service: PropostasService,
    protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.service.proposta.subscribe(p => {
      this.proposta = p;
      if (this.proposta.captacaoStatus === 'Refinamento') {
        this.form.get('alteracao').setValidators(Validators.required);
      }
    });

    this.route.data.subscribe(data => {
      const blob = new Blob([data.documento.content], {type: 'text/html'});
      this._url = URL.createObjectURL(blob);
      this.validations = data.documento.validacao;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(this._url);
    });
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
      const url = await this.fileService.download(`Propostas/${this.proposta.guid}/Download/PlanoTrabalho`);
      this.fileService.downloadBlob(url, 'plano-de-trabalho.pdf');
    } catch (e) {
      console.error(e);
    }
    this.loading.hide();
  }

  async marcarComoFinalizado() {
    this.loading.show();
    try {
      const result = await this.service.marcarComoFinalizado(this.proposta.guid, this.form.value.alteracao);
      if (this.proposta.captacaoStatus === 'Refinamento') {
        await this.uploadFiles(result.id);
      }
      this.app.alert('Proposta marcada como finalizada').then();
      this.proposta.planoFinalizado = true;
      this.proposta.planoTrabalhoAprovacao = 'Pendente';
      this.service.setProposta(this.proposta);
      this.router.onSameUrlNavigation = 'reload';
      this.form.reset();
      this.form.updateValueAndValidity();
      this.router.navigate(['./'], {relativeTo: this.route}).then();
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


  fileChange(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    // this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  removeFile(i) {
    this.files.splice(i, 1);
  }

  async uploadFiles(id) {
    if (this.files.length === 0 || parseFloat(id) === 0) {
      return;
    }
    await this.service.upload(this.files, `Comentario/${id}/Arquivo`);
  }

}
