import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HistoricoComponent} from '@app/user-fornecedor/propostas/proposta/04-validacao-contratos/historico/historico.component';
import {Contrato} from '@app/user-fornecedor/propostas/proposta/04-validacao-contratos/shared';
import {FileService} from '@app/services/file.service';
import {ConfigEditor} from '@app/core/shared';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';


@Component({
  selector: 'app-view-contrato',
  templateUrl: './view-contrato.component.html',
  styleUrls: ['./view-contrato.component.scss']
})
export class ViewContratoComponent implements OnInit {
  editor = ClassicEditor;
  configEditor = ConfigEditor;
  contrato: Contrato;
  form = this.fb.group({
    draft: [true],
    conteudo: ['', Validators.required]
  });

  constructor(
    private app: AppService,
    private parent: PropostaComponent,
    private service: PropostasService,
    private route: ActivatedRoute,
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
  }

  async onSubmit(evt: any) {
    try {
      this.app.loading.show().then();
      if (this.form.valid) {
        const saveAsDraft = evt.submitter.value === 'draft';
        this.form.get('draft').setValue(saveAsDraft);
        this.contrato.id = parseFloat(await this.service.saveContrato(this.parent.proposta.captacaoId, this.form.value));

        this.app.alert('Contrato Salvo com sucesso!').then();
        this.contrato.finalizado = !saveAsDraft;

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

      const url = await this.fileService.download(`Fornecedor/Propostas/${this.parent.proposta.captacaoId}/Download/Contrato`);
      this.fileService.downloadBlob(url, 'contrato.pdf');
    } catch (e) {
      console.error(e);
    }
  }

  async historico() {
    const ref = this.modal.open(HistoricoComponent, {size: 'xl'});
    const component = ref.componentInstance as HistoricoComponent;
    component.captacaoId = this.parent.proposta.captacaoId;
    component.contratoId = this.contrato.parentId;
    component.contrato = this.contrato;
    await ref.result;
  }

}
