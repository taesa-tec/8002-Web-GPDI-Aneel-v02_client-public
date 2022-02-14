import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Projeto} from '@app/pages/projetos/projeto/projeto.component';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {FileService} from '@app/services/file.service';
import {Capacitacao} from '../../relatorio';
import {AppService, UploadFilesService} from '@app/services';
import * as moment from 'moment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  capacitacao: Capacitacao;
  recursos: Array<any>;
  file: File;

  form = this.fb.group({
    id: [0, Validators.required],
    recursoId: ['', Validators.required],
    tipo: ['', Validators.required],
    isConcluido: ['', Validators.required],
    dataConclusao: ['', Validators.required],
    cnpjInstituicao: ['', Validators.required],
    areaPesquisa: ['', Validators.required],
    tituloTrabalhoOrigem: ['', Validators.required],
    arquivoTrabalhoOrigemId: ['']
  });

  constructor(
    private app: AppService,
    private uploadService: UploadFilesService,
    private fileService: FileService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();

    if (this.capacitacao) {
      this.form.patchValue({
        ...this.capacitacao,
        dataConclusao: moment(this.capacitacao.dataConclusao).format('yyyy-MM-DD')
      });
    }
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this[file] = files.length > 0 ? files.item(0) : null;
  }

  deleteFile() {
    this.capacitacao.arquivoTrabalhoOrigemId = null;
  }

  async downloadFile() {
    await this.fileService.urlToBlobDownload(`Projetos/${this.projeto.id}/Relatorio/Capacitacao/${this.capacitacao.id}/Arquivos/Origem`, null);
  }

  validate() {
    return (this.form.valid && (this.capacitacao?.arquivoTrabalhoOrigemId || this.file));
  }

  async delete() {
    try {
      if (this.validate()) {
        if (await this.app.confirm('Tem certeza que deseja excluir esta capacitacao?')) {
          await this.service.delete(`${this.projeto.id}/Relatorio/Capacitacao/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async submit() {
    try {
      if (this.validate()) {
        const path = `${this.projeto.id}/Relatorio/Capacitacao`;

        if (this.file) {
          const file = await this.uploadService.upload([this.file], 'File');
          this.form.patchValue({arquivoTrabalhoOrigemId: file[0].id});
        }

        if (this.form.value.id) {
          await this.service.put(path, this.form.value);
        } else {
          await this.service.post(path, this.form.value);
        }

        this.app.alert('Capacitação salva com sucesso!');
        this.activeModal.close();
      }
    } catch (e) {
      this.app.alertError('Não foi possível salvar o registro');
      console.error(e);

    }
  }

}
