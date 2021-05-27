import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {PropostaComponent} from '@app/proposta/proposta.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HistoricoComponent} from '@app/proposta/pages/04-validacao-contratos/historico/historico.component';
import {Contrato} from '@app/proposta/pages/04-validacao-contratos/shared';
import {FileService} from '@app/services/file.service';
import {ConfigEditor} from '@app/core/shared';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';
import {Proposta} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';


@Component({
  selector: 'app-view-contrato',
  templateUrl: './view-contrato.component.html',
  styleUrls: ['./view-contrato.component.scss']
})
export class ViewContratoComponent implements OnInit {
  proposta: Proposta;
  editor = ClassicEditor;
  configEditor = ConfigEditor;
  contrato: Contrato;
  files: File[] = [];
  form = this.fb.group({
    draft: [true],
    conteudo: ['', Validators.required],
    alteracao: ['']
  });

  get fornecedorCanEdit() {
    return this.canEdit && (
      this.proposta.captacaoStatus === 'Fornecedor' ||
      (this.proposta.captacaoStatus === 'Refinamento' && this.proposta.contratoAprovacao === 'Alteracao')
    );
  }

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    private app: AppService,
    private parent: PropostaComponent,
    private service: PropostasService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private fb: FormBuilder,
    protected fileService: FileService,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.contrato = data.contrato;
      this.form.get('conteudo').patchValue(this.contrato.conteudo || this.contrato.parent.conteudo);
    });
    this.service.proposta.subscribe(p => {
      this.proposta = p;
      if (this.proposta.captacaoStatus === 'Refinamento') {
        this.form.get('alteracao').setValidators(Validators.required);
        this.form.updateValueAndValidity();
      }
    });

    if (!this.canEdit || !this.fornecedorCanEdit) {
      this.form.disable();
    }
  }

  async onSubmit(evt: any) {
    try {
      const saveAsDraft = evt.submitter.value === 'draft';
      if (saveAsDraft && (this.files.length > 0 || this.proposta.captacaoStatus === 'Refinamento')) {
        await this.app.alert('Arquivos selecionados não serão enviados e o descritivo das alterações não será salvo', 'Atenção');
      }
      this.app.loading.show().then();
      if (this.form.valid) {
        this.form.get('draft').setValue(saveAsDraft);
        const response: any = await this.service.saveContrato(this.proposta.guid, this.form.value);
        this.contrato.id = response.id;
        this.contrato.finalizado = !saveAsDraft;
        this.app.alert('Contrato Salvo com sucesso!').then();
        if (this.proposta.captacaoStatus === 'Refinamento' && !saveAsDraft) {
          this.proposta.contratoAprovacao = 'Pendente';
          await this.uploadFiles(response.comentario.id);
          this.service.setProposta(this.proposta);
        }

      }
    } catch (e) {
      this.app.alert('Ocorreu um erro ao salvar o contrato!').then();
      console.error(e);
    } finally {
      this.app.loading.hide();
    }
  }

  async downloadPdf() {
    try {

      const url = await this.fileService.download(`Propostas/${this.proposta.guid}/Download/Contrato`);
      this.fileService.downloadBlob(url, 'contrato.pdf');
    } catch (e) {
      console.error(e);
    }
  }

  async historico() {
    const ref = this.modal.open(HistoricoComponent, {size: 'xl'});
    const component = ref.componentInstance as HistoricoComponent;
    component.contratoId = this.contrato.parentId;
    component.contrato = this.contrato;
    await ref.result;
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
    await this.service.upload(this.files, `${this.proposta.guid}/Contrato/Comentario/${id}/Arquivo`);
  }

}
